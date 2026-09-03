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
    const inputClass = "border rounded border-gold/75 bg-navy/75 text-white px-3 py-2 focus:outline-none focus:border-gold";
    const labelClass = "text-white/55 text-sm md:text-base";

    return (
        <div className="max-w-4xl mx-auto">
            {listing && (

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div>
                        <h3 className="font-display text-gold font-bold text-2xl md:text-3xl">Edit Listing</h3>
                        <hr className="border-gold mt-4 mb-6 w-40" />
                    </div>

                    <img className="w-full h-80 object-cover rounded-xl"
                        src={listing.image_url}
                        alt={listing.address}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className={labelClass}>Image URL</label>
                            <input className={inputClass} type="text" name="image_url" value={listing.image_url} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Address</label>
                            <input className={inputClass} type="text" name="address" value={listing.address} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>City</label>
                            <input className={inputClass} type="text" name="city" value={listing.city} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Province</label>
                            <input className={inputClass} type="text" name="province" value={listing.province} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Price</label>
                            <input className={inputClass} type="number" name="price" value={listing.price} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Listing Type</label>
                            <input className={inputClass} type="text" name="listing_type" value={listing.listing_type} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Property Type</label>
                            <input className={inputClass} type="text" name="property_type" value={listing.property_type} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Square Footage</label>
                            <input className={inputClass} type="number" name="square_feet" value={listing.square_feet} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Bedrooms</label>
                            <input className={inputClass} type="number" name="bedrooms" value={listing.bedrooms} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Bathrooms</label>
                            <input className={inputClass} type="number" name="bathrooms" value={listing.bathrooms} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className={labelClass}>Description</label>
                            <textarea className={`${inputClass} min-h-32`} name="description" value={listing.description} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <button className="self-start bg-gold/75 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all" type="submit">Save Changes</button>
                    {status && <p className="text-white/70">{status}</p>}
                </form>

            )}
        </div>
    )


}

