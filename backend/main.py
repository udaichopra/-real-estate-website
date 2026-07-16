from fastapi import FastAPI, HTTPException, status

from pydantic import BaseModel, EmailStr, Field

from database import supabase

app = FastAPI(title="Real Estate Website API")

class LeadCreate(BaseModel):
    full_name: str
    phone : str | None=Field(default=None, max_length=30)
    email : EmailStr
    message :str | None=Field(default=None,max_length=2000)


@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/api/leads",status_code=status.HTTP_201_CREATED)
def post_leads(lead:LeadCreate):
    response=(supabase.table("leads").insert(lead.model_dump()).execute())
    return response.data

    