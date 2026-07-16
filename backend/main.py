from fastapi import FastAPI, HTTPException, status

from pydantic import BaseModel, EmailStr, Field

from database import supabase

app = FastAPI(title="Real Estate Website API")

@app.get("/")

def root():

    return {"message": "API is running"}