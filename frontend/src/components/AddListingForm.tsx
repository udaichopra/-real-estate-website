import { useState } from "react";
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
            const response = await fetch(
                "http://127.0.0.1:8000/admin/newlisting",
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



    return (
        <div>
            <h3>Enter the information of the listing you would like to upload</h3>
            <form>
                <h3>Image Url:</h3> <input type="text" name="image_url" onChange={handleChange}></input>
                <h3>Address:</h3> <input type="text" name="address" onChange={handleChange}></input>
                <h3>Province:</h3> <input type="text" name="province" onChange={handleChange}></input>
                <h3>City:</h3><input type="text" name="city" onChange={handleChange}></input>
                <h3>Postal code:</h3> <input type="text" name="postal_code" onChange={handleChange}></input>
                <h3>Price:</h3><input type="text" name="price" onChange={handleChange}></input>
                <h3>Square footage:</h3><input type="text" name="square_feet" onChange={handleChange}></input>
                <h3>Bedrooms:</h3><input type="text" name="bedrooms" onChange={handleChange}></input>
                <h3>Bathrooms:</h3><input type="text" name="bathrooms" onChange={handleChange}></input>
                <h3>For sale or for rent?: </h3>
                <select name="listing_type" onChange={handleChange}>
                    <option value="For sale">For sale</option>
                    <option value="For lease">For lease</option>
                </select>
                <h3>Type of property</h3>
                <select name="property_type" onChange={handleChange}>
                    <option value="Detached">Detached</option>
                    <option value="Semi-Detached">Semi-Detached</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Condo">Condo</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                </select>
                <h3>Would you like to feature this listing on your site?</h3>
                <select name="featured" onChange={handleChange}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                <h3>Write a desctiption of the property:</h3> <input type="text" name="description" onChange={handleChange}></input>
                <button type="button" onClick={handleClick}> Submit this listing</button>
                <h3>{String(status)}</h3>
            </form>
        </div>
    )
}