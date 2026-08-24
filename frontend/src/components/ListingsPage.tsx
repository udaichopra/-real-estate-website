type Listing = {
    id: string;
    image_url: string;
    address: string;
    city: string;
    price: number;
    listing_type: string;
};
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
export default function Listings_Page() {
    const [listings, setlistings] = useState<Listing[]>([]);
    const getListings = async () => {
        const response = await fetch(`${API_URL}/api/listings`);
        const data = await response.json()
        setlistings(data)

    }
    useEffect(() => {
        getListings();
    }, []);
    return (
        <div>
            
            <h3 className="text-left ml-14 text-2xl md:text-3xl font-bold pt-2 m-5">Current listings</h3>

            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full text-3xl">
                {listings.length === 0 && (
                    <h3>No properties are currently available</h3>
                )}
                {listings.map((listing) => (
                    <div>
                        <Link to={`/listings/${listing.id}`}>
                            <div className=" hover:scale-105 grid place-items-center hover:scale-105 hover:text-blue-500 transition-all" key={listing.id}>
                                <div className="relative">
                                    <div className="absolute top-2 left-2 bg-blue-900 text-white px-4 py-2 rounded-xl text-lg font-bold">
                                        {listing.listing_type}
                                    </div>
                                    <img className="w-full h-64 object-cover text-left"
                                        src={listing.image_url}
                                        alt={listing.address}

                                    />
                                    <div className="absolute inset-0 backdrop-blur bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">View Property Details</span>
                                    </div>
                                </div>
                                <div className="grid row-2 text-center text-2xl md:text-3xl mt-3 gap-1 ">
                                    <h3>{listing.address}, {listing.city}</h3>
                                    <h3>${listing.price.toLocaleString("en-CA")}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>

    )

}