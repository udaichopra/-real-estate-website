# Real Estate Website

A full-stack real estate platform built for an independent real estate agent to establish an online presence, showcase property listings, and capture leads from prospective buyers, sellers, renters, and investors.

## Live Site
[real-estate-website-ten-henna.vercel.app](https://real-estate-website-ten-henna.vercel.app/)

## Tech Stack
- **Frontend:** React + TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Python + FastAPI
- **Database & Auth:** Supabase (PostgreSQL)
- **Maps/Geocoding:** Leaflet + React-Leaflet, OpenStreetMap Nominatim
- **Deployment:** Vercel (frontend) + Render (backend)

## Features

### Public site
- Home page with hero section and featured listings
- Property listings page with filters (type, city, price, bedrooms, bathrooms)
- Property detail page with an interactive map (auto-geocoded from address)
- Lead submission / contact form, tied to a specific listing when relevant
- Responsive layout across desktop, tablet, and mobile

### Admin portal
- Supabase-authenticated admin login
- Protected routes for admin-only pages
- Add new listings (with automatic geocoding and duplicate detection)
- View and edit existing listings

## Project Structure
```
.
├── backend/          # FastAPI app
│   ├── main.py        # API routes
│   └── database.py    # Supabase client setup
├── frontend/         # React + TypeScript app (Vite)
│   └── src/
│       ├── components/
│       ├── config.ts        # API base URL
│       └── supabaseClient.ts
└── docs/
    └── client-requirements.md
```

## API Overview
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/listings` | List properties, with optional filters (type, city, price range, bedrooms, bathrooms) |
| GET | `/api/listings/{id}` | Get a single property |
| POST | `/api/leads` | Submit a lead / inquiry |
| POST | `/admin/newlisting` | Create a new listing (geocodes address) |
| PUT | `/admin/editlisting/{id}` | Update an existing listing |

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Create a `backend/.env` file with:
```
SUPABASE_URL=
SUPABASE_KEY=
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Create a `frontend/.env.local` file with:
```
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

## Status
Public site (listings, property detail, lead capture) and admin listing management are live. Client management and sold-property tracking (Phase 2, see [docs/client-requirements.md](docs/client-requirements.md)) are not yet implemented.
