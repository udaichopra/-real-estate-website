# Client Requirements

## Project Overview
Build a full-stack real estate website for an independent real estate professional. The platform should improve the client's online presence, generate new leads, display property information, and provide a simple way to track clients and completed property transactions.

## Client
Homelife miracle real estate agent.

## Primary Goals
- Create a professional online presence.
- Generate leads from buyers, sellers, renters, and investors.
- Display active and featured property listings.
- Store submitted inquiries in a database.
- Keep records of current and past clients.
- Track sold properties and completed transactions.

## Target Users
- Home buyers
- Home sellers
- Renters
- Real estate investors
- Returning clients

## Core User Flow
1. A visitor opens the website.
2. The visitor learns about the agent and services offered.
3. The visitor views available properties.
4. The visitor submits an inquiry.
5. The inquiry is saved in the database.
6. The agent reviews and follows up with the lead.

## MVP Requirements

### Public Website
- Responsive layout for desktop, tablet, and mobile
- Home page
- About section
- Buyer services section
- Seller services section
- Property listings page
- Property detail page
- Contact and lead submission form
- Agent contact information
- Clear navigation

### Lead Submission Form
The form should collect:
- Full name
- Email address
- Phone number
- Inquiry type
- Preferred city
- Budget range
- Message
- Consent to be contacted

Inquiry types:
- Buying
- Selling
- Renting
- Investing
- General inquiry

The form should:
- Validate required fields
- Validate email format
- Show useful error messages
- Show a success message after submission
- Save the lead in PostgreSQL

### Property Listings
Each property should include:
- Title
- Price
- Address or general location
- City
- Description
- Property type
- Number of bedrooms
- Number of bathrooms
- Images
- Listing status
- Featured status

Listing statuses:
- Active
- Sold
- Inactive

## Phase 2

### Admin Portal
- Secure login
- View and manage submitted leads
- Add, edit, and deactivate properties
- Mark properties as sold

### Client Management
Each client record should include:
- Full name
- Email address
- Phone number
- Client type (Buyer, Seller, Renter, Investor)
- Preferred city
- Budget range
- Notes
- Client status (Lead, Active, Past Client, Closed)
- Date added

### Sold Property Tracking
Each sold property record should include:
- Property address
- City
- Sale price
- Closing date
- Client info
- Transaction type (Buyer Representation, Seller Representation)
- Notes

## Technical Requirements

### Frontend
- React + TypeScript
- Responsive design
- React Router
- Form validation
- API integration

### Backend
- Python + FastAPI
- REST API
- Input validation
- Error handling

### Database
- PostgreSQL via Supabase

### Deployment
- Frontend: Vercel
- Backend: Render
- Environment variables for all secrets
- HTTPS enabled in production

## Security Requirements
- Admin features require authentication
- Passwords must never be stored as plain text
- Database credentials must not be committed to GitHub
- All user input must be validated
- Sensitive values stored in environment variables
- Public forms include basic spam protection

## MVP Success Criteria
- Public website is deployed
- Works on mobile and desktop
- Visitors can view property listings
- Visitors can open a property detail page
- Visitors can submit an inquiry
- Submitted inquiries are stored in PostgreSQL
- Agent can view submitted leads

## Future Features
- Full CRM dashboard
- Sold property history dashboard
- Appointment booking
- Email notifications
- Lead scoring
- Analytics
- MLS integration
- AI chatbot
- Automated follow-up messages