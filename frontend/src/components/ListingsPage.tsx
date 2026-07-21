import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
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
            <Link to={`/listings/${listing.id}`}>
            <div className="card" key={listing.id}>
                <img
                src={listing.image_url}
                alt={listing.address}
                width="300"
                />
                <h3>Address: {listing.address}</h3>
                <h3>City: {listing.city}</h3>
                <h3>Price: {listing.price}</h3>
            </div>
            </Link>

        ))}
        </div>

    )

}