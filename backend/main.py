from fastapi import FastAPI, HTTPException, status

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

class LeadCreate(BaseModel):
    full_name: str=Field(min_length=2,max_length=50)
    phone : str | None=Field(default=None, max_length=30)
    email : EmailStr= Field(min_length=3,max_length=50)
    message :str | None=Field(default=None,max_length=2000)
    listing_id: str | None = None


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


    