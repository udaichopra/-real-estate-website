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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import ListingsFilter from "./ListingsFilter";
export default function Listings_Page() {
    const [listings, setlistings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const getListings = async () => {
        const response = await fetch(`${API_URL}/api/listings`);
        const data = await response.json()
        setlistings(data)
        setLoading(false)

    }
    useEffect(() => {
        getListings();
    }, []);
    return (
        <div>
            <ListingsFilter setlistings={setlistings} getListings={getListings} />
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-3xl pt-5 pb-10 px-5">
                {loading && (
                    <h3 className="text-lg md:text-2xl">Loading listings...</h3>
                )}
                {!loading && listings.length === 0 && (
                    <h3 className="text-lg md:text-2xl">No properties are currently available</h3>
                )}
                {listings.map((listing) => (
                    <Link to={`/listings/${listing.id}`} className="w-full" key={listing.id}>
                        <div className="hover:scale-105 transition-all bg-navy-mid/50 rounded-2xl overflow-hidden w-full">
                            <div className="relative">
                                <div className="absolute top-2 left-2 bg-blue-900 text-white px-4 py-2 rounded-xl text-lg font-bold">
                                    {listing.listing_type}
                                </div>
                                <img className="w-full h-64 object-cover"
                                    src={listing.image_url}
                                    alt={listing.address}
                                />
                                <div className="absolute inset-0 backdrop-blur bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">View Property Details</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-1 text-left font-sans">
                                <h3 className="text-xl md:text-2xl">{listing.address}</h3>
                                <p className="text-white/55 text-base">{listing.city}, {listing.province}</p>
                                <p className="text-gold text-2xl mt-1">${listing.price.toLocaleString("en-CA")}{listing.listing_type === "For lease" && "/month"}</p>
                                <p className="text-white/55 text-sm">{listing.listing_type} • {listing.property_type}</p>
                                <p className="text-white/55 text-sm">{listing.square_feet} sq ft • {listing.bedrooms} beds • {listing.bathrooms} baths</p>
                                <p className="text-white/70 text-sm mt-2 line-clamp-3">{listing.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )

}