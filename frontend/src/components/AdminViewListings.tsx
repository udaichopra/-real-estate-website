import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

type Listing = {
    id: string;
    image_url: string;
    address: string;
    city: string;
    province: string;
    price: number;
    listing_type: string;
    property_type: string;
    square_feet: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
};

export default function AdminViewListing() {
    const [listings, setListings] = useState<Listing[]>([]);
    const navigate = useNavigate();

    const getListings = async () => {
        const response = await fetch(`${API_URL}/api/listings`);
        const data = await response.json();
        setListings(data);
    };

    useEffect(() => {
        getListings();
    }, []);
    const handleEdit = (listingId: string) => {
        navigate(`/admin/editlisting/${listingId}`);
    }



    return (
        <div>
            {listings.map((listing) => (
                <div className="text-left mb-4 text-xl"key={listing.id}>
                    <img className=" h-150 object-cover text-left"
                    src={listing.image_url}
                    alt={listing.address}
                    />
                    <h3>Address: {listing.address}</h3>
                    <h3>City: {listing.city}</h3>
                    <h3>Province: {listing.province}</h3>
                    <h3>Price: ${listing.price}</h3>
                    <h3>Listing Type: {listing.listing_type}</h3>
                    <h3>Property Type: {listing.property_type}</h3>
                    <h3>Square footage: {listing.square_feet} sq ft</h3>
                    <h3>Bedrooms: {listing.bedrooms} bedrooms</h3>
                    <h3>Bathrooms: {listing.bathrooms} bathrooms</h3>
                    <p>Description: {listing.description}</p> 
                    <button className="bg-blue-950 border-xl border rounded-xl p-5" onClick={() => handleEdit(listing.id)}>Edit this Listing</button>
                </div>
            ))}

        </div>
    );
}