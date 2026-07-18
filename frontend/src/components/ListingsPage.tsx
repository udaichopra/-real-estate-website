import { useState, useEffect } from "react";
export default function Listings_Page(){
    const [listings,setlistings]=useState([]);
    const getListings= async ()=>{
        const response = await fetch("http://127.0.0.1:8000/api/listings");
        const data= await response.json()
        setlistings(data)

    }
    useEffect(() => {
        getListings();
    }, []);
    return(
        <div>
        <h3>Puneet Chopra's current listings:</h3>

        {listings.map((listing)=>(
            <div key={listing.id}>
                <img
                src={listing.image_url}
                alt={listing.address}
                width="300"
                />
                <h3>Address: {listing.address}</h3>
                <h3>City: {listing.city}</h3>
                <h3>Price: {listing.price}</h3>
                <h3>Listing type: {listing.listing_type}</h3>
                <h3>Property type:{listing.property_type}</h3>
                <h3>Square footage: {listing.square_feet}</h3>
                <h3>Bedrooms: {listing.bedrooms}</h3>
                <h3>Bathrooms: {listing.bathrooms}</h3>
                <h3>Description: {listing.description}</h3>
            </div>
        ))}
        </div>

    )

}