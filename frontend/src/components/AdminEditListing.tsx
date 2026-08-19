import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

export default function AdminEditListing() {
    const { id } = useParams();
    const [listing, setListing] = useState<Listing | null>(null);
    const [status, setStatus] = useState("")
    const navigate=useNavigate();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!listing) {
            return;
        }
        const name = event.target.name
        const value = event.target.value
        const type = event.target.type
        setListing({ ...listing, [name]: type === "number" ? Number(value) : value })


    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!listing) {
            return
        }

        const response = await fetch(`${API_URL}/admin/editlisting/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listing),
        });
        const data = await response.json()
        if (!response.ok) {
            setStatus(data.detail || "Unable to edit listing")
            return
        }
        setStatus("Listing Edited Successfully")

        setTimeout(() => {
            setStatus("");
            navigate("/admin/viewlistings")
        }, 6000);



    }



    useEffect(() => {

        const fetchListing = async () => {
            const response = await fetch(`${API_URL}/api/listings/${id}`)
            const data = await response.json();
            setListing(data[0]);
        }
        fetchListing();
    }, [id]);
    return (
        <div>
            {listing && (

                <form className="text-left mb-4 text-xl" onSubmit={handleSubmit}>
                    <img className=" h-150 object-cover text-left"
                        src={listing.image_url}
                        alt={listing.address}
                    />
                    <h3>Image URL: </h3><input type="text" name="image_url" value={listing.image_url} onChange={handleChange}></input>
                    <h3>Address: </h3><input type="text" name="address" value={listing.address} onChange={handleChange}></input>
                    <h3>City: </h3><input type="text" name="city" value={listing.city} onChange={handleChange}></input>
                    <h3>Province: </h3><input type="text" name="province" value={listing.province} onChange={handleChange}></input>
                    <h3>Price: </h3><input type="number" name="price" value={listing.price} onChange={handleChange}></input>
                    <h3>Listing Type: </h3><input type="text" name="listing_type" value={listing.listing_type} onChange={handleChange}></input>
                    <h3>Property Type: </h3><input type="text" name="property_type" value={listing.property_type} onChange={handleChange}></input>
                    <h3>Square footage: </h3><input type="number" name="square_feet" value={listing.square_feet} onChange={handleChange}></input>
                    <h3>Bedrooms: </h3><input type="number" name="bedrooms" value={listing.bedrooms} onChange={handleChange}></input>
                    <h3>Bathrooms: </h3><input type="number" name="bathrooms" value={listing.bathrooms} onChange={handleChange}></input>
                    <h3>Description: </h3><textarea name="description" value={listing.description} onChange={handleChange}></textarea>
                    <button type="submit">Save Changes</button >
                    
                    {status && <p>{status}</p>}
                </form>

            )}
        </div>
    )


}

