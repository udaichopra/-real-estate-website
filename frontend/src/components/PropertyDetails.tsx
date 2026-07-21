import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import NavBar from "./Navbar";
export default function PropertyDetails() {
    
    type Listing = {
        id: string;
        image_url: string;
        address: string;
        city: string;
        price: number;
        listing_type: string;
        property_type: string;
        square_feet: number;
        bedrooms: number;
        bathrooms: number;
        description: string;
    };
    const [details, setDetails] = useState<Listing | null>(null);


    const { id } = useParams();

    const get_Details = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/listings/${id}`);
        const data = await response.json()
        setDetails(data[0])

    }

    useEffect(() => {
        get_Details();
    }, [id]);
    if (!details) {
        return (
            <p>Details loading</p>
        )
    }
    return (
        <div>
            <div className="card" >
                <img
                    src={details.image_url}
                    alt={details.address}
                    width="300"
                />
                <h3>Price: {details.price}</h3>
                <h3>City: {details.city}</h3>
                <h3>Address: {details.address}</h3>
                <h3>Listing type: {details.listing_type}</h3>
                <h3>Property type:{details.property_type}</h3>
                <h3>Square footage: {details.square_feet}</h3>
                <h3>Bedrooms: {details.bedrooms}</h3>
                <h3>Bathrooms: {details.bathrooms}</h3>
                <h3>Description: {details.description}</h3>
                <h3>Intrested in this property?</h3>
                <ContactForm listing_id={details.id}/>
            </div>
        </div>

    )

}