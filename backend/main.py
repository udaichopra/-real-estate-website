from fastapi import FastAPI, HTTPException, status
import httpx
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, EmailStr, Field

from database import supabase

app = FastAPI(title="Real Estate Website API")

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

    "http://localhost:5173",

    "http://localhost:5174",

    "http://localhost:5175",

    "http://localhost:5176",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)
def geocode_address(
    address: str,
    city: str,
    province: str,
    postal_code: str,
) -> tuple[float, float]:
    full_address = (
        f"{address}, {city}, {province}, "
        f"{postal_code}, Canada"
    )

    try:
        response = httpx.get(
            "https://nominatim.openstreetmap.org/search",
            params={
                "q": full_address,
                "format": "jsonv2",
                "limit": 1,
                "countrycodes": "ca",
            },
            headers={
                "User-Agent": (
                    "PuneetChopraRealEstate/1.0 "
                    "(contact: udai25chopra@gmail.com)"
                )
            },
            timeout=10.0,
        )

        response.raise_for_status()

    except httpx.HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Geocoding service failed: {str(error)}",
        )

    results = response.json()

    if not results:
        raise HTTPException(
            status_code=400,
            detail="Address could not be located.",
        )

    return float(results[0]["lat"]), float(results[0]["lon"])

class LeadCreate(BaseModel):
    full_name: str=Field(min_length=2,max_length=50)
    phone : str | None=Field(default=None, max_length=30)
    email : EmailStr= Field(min_length=3,max_length=50)
    message :str | None=Field(default=None,max_length=2000)
    listing_id: str | None = None

class ListingCreate(BaseModel):
    image_url: str
    address: str = Field(min_length=1, max_length=100)
    city: str = Field(min_length=1, max_length=50)
    price: int
    bedrooms: int
    bathrooms: int
    square_feet: int
    description: str = Field(max_length=2000)
    listing_type: str
    property_type: str
    featured: bool
    province: str = Field(min_length=2, max_length=50)
    postal_code: str = Field(min_length=3, max_length=10)


@app.get("/api/listings")
def getlistings():
    response=(supabase.table("listings").select("*").eq("featured", True).execute())
    return response.data
@app.get("/api/listings/{id}")
def getDetails(id:str):
    response=(supabase.table("listings").select("*").eq("id",id).execute())
    return response.data


@app.post("/api/leads",status_code=status.HTTP_201_CREATED)
def post_leads(lead:LeadCreate):
    response=(supabase.table("leads").insert(lead.model_dump()).execute())
    return response.data


@app.post("/admin/newlisting",status_code=status.HTTP_201_CREATED,)
def post_newlisting(new_listing: ListingCreate):
    latitude, longitude = geocode_address(
        new_listing.address,
        new_listing.city,
        new_listing.province,
        new_listing.postal_code,
    )
    listing_data = new_listing.model_dump()
    listing_data["latitude"] = latitude
    listing_data["longitude"] = longitude
    response = (
        supabase
        .table("listings")
        .insert(listing_data)
        .execute()
    )
    return response.data
