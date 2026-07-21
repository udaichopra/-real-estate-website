import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
export default function Listings_Page() {
    const [listings, setlistings] = useState([]);
    const getListings = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/listings");
        const data = await response.json()
        setlistings(data)

    }
    useEffect(() => {
        getListings();
    }, []);
    return (
        <div>
            <h3 className="text-center text-5xl pt-5">Puneet Chopra's current listings:</h3>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full text-3xl">

                {listings.map((listing) => (
                    <div>
                        <Link to={`/listings/${listing.id}`}>
                            <div className=" hover:scale-105 grid place-items-center hover:scale-105 hover:text-blue-500 transition-all" key={listing.id}>
                                <div className="relative">
                                <img className="text-left"
                                    src={listing.image_url}
                                    alt={listing.address}
                                    width="600"
                                />
                                <div className="absolute inset-0 backdrop-blur bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">View Property Details</span>
                                </div>
                                </div>
                                <h3>Address: {listing.address}</h3>
                                <h3>City: {listing.city}</h3>
                                <h3>Price: {listing.price}</h3>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>

    )

}