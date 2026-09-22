import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

type Listing = {
    id: string;
    image_url: string;
    address: string;
    city: string;
    province: string;
    price: number;
    listing_type: string;
    property_type: string;
    square_feet: string;
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

    const handleDelete = async (listingId: string) => {
        if (!confirm("Delete this listing? This can't be undone.")) {
            return;
        }
        const response = await fetch(`${API_URL}/admin/deletelisting/${listingId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return;
        }
        setListings(listings.filter((listing) => listing.id !== listingId));
    }



    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/admin" className="text-gold/75 hover:text-gold text-sm">← Back to Dashboard</Link>
            <h3 className="font-display text-gold font-bold text-2xl md:text-3xl mt-4">Manage Listings</h3>
            <hr className="border-gold mt-4 mb-6 w-40" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                    <div className="bg-navy-mid/50 rounded-2xl overflow-hidden text-left" key={listing.id}>
                        <img className="w-full h-56 object-cover"
                            src={listing.image_url}
                            alt={listing.address}
                        />
                        <div className="p-5 flex flex-col gap-1">
                            <h3 className="font-display text-xl font-bold">{listing.address}</h3>
                            <p className="text-white/55">{listing.city}, {listing.province}</p>
                            <p className="text-gold text-lg">${listing.price.toLocaleString("en-CA")}{listing.listing_type === "For lease" && "/month"}</p>
                            <p className="text-white/55 text-sm">{listing.listing_type} • {listing.property_type}</p>
                            <p className="text-white/55 text-sm">{listing.square_feet} sq ft • {listing.bedrooms} beds • {listing.bathrooms} baths</p>
                            <p className="text-white/70 text-sm mt-2 line-clamp-3">{listing.description}</p>
                            <div className="flex gap-3 mt-4">
                                <button className="bg-gold/75 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all" onClick={() => handleEdit(listing.id)}>Edit this Listing</button>
                                <button className="border border-white/30 text-white/70 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all" onClick={() => handleDelete(listing.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}