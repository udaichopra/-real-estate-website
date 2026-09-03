import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
export default function AddListingForm() {
    const [newListing, setNewListing] = useState({
        image_url: "", address: "", city: "", price: "", bedrooms: "", bathrooms: "", listing_type: "",
        property_type: "", featured: false, square_feet: "", description: "", province: "", postal_code: ""
    })
    const [status, setStatus] = useState("")
    const handleChange = (event: any) => {
        const name = event.target.name
        let value = event.target.value
        if (name === "featured") {
            value = value === "true";
        }
        if (name === "price" || name === "bedrooms" || name === "bathrooms" || name === "square_feet") {
            value = Number(value);
        }
        setNewListing({ ...newListing, [name]: value });

    }
    const handleClick = async (event: any) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/admin/newlisting`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newListing),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setStatus(
                    typeof data.detail === "string"
                        ? data.detail
                        : JSON.stringify(data.detail)
                );
                return;
            }

            setStatus("Listing submitted successfully");
        } catch (error) {
            console.error(error);
            setStatus("Unable to connect to the backend.");
        }
    };


    const inputClass = "border rounded border-gold/75 bg-navy/75 text-white px-3 py-2 focus:outline-none focus:border-gold";
    const labelClass = "text-white/55 text-sm md:text-base";

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/admin" className="text-gold/75 hover:text-gold text-sm">← Back to Dashboard</Link>
            <h3 className="font-display text-gold font-bold text-2xl md:text-3xl mt-4">Add a New Listing</h3>
            <p className="text-white/55 mt-2">Fill out the details below to publish a new property.</p>
            <hr className="border-gold mt-4 mb-6 w-40" />

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className={labelClass}>Image URL</label>
                    <input className={inputClass} type="text" name="image_url" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Address</label>
                    <input className={inputClass} type="text" name="address" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Province</label>
                    <input className={inputClass} type="text" name="province" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>City</label>
                    <input className={inputClass} type="text" name="city" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Postal Code</label>
                    <input className={inputClass} type="text" name="postal_code" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Price</label>
                    <input className={inputClass} type="text" name="price" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Square Footage</label>
                    <input className={inputClass} type="text" name="square_feet" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Bedrooms</label>
                    <input className={inputClass} type="text" name="bedrooms" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Bathrooms</label>
                    <input className={inputClass} type="text" name="bathrooms" onChange={handleChange}></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>For Sale or For Lease?</label>
                    <select className={inputClass} name="listing_type" onChange={handleChange}>
                        <option value="For sale">For sale</option>
                        <option value="For lease">For lease</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Property Type</label>
                    <select className={inputClass} name="property_type" onChange={handleChange}>
                        <option value="Detached">Detached</option>
                        <option value="Semi-Detached">Semi-Detached</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Condo">Condo</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className={labelClass}>Feature This Listing?</label>
                    <select className={inputClass} name="featured" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea className={`${inputClass} min-h-32`} name="description" onChange={handleChange}></textarea>
                </div>

                <button className="self-start bg-gold/75 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all md:col-span-2" type="button" onClick={handleClick}>Submit this listing</button>
                {status && <p className="text-white/70 md:col-span-2">{status}</p>}
            </form>
        </div>
    )
}