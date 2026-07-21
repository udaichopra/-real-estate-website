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
        <div className="grid rounded-xl border border-blue-950 place-items-center text-3xl text-center pt-5 ">
            <div>
                <div className="grid place-items-center pb-4">
                    <img
                        src={details.image_url}
                        alt={details.address}
                        width="500"
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <h3>Price: {details.price}</h3>
                    <h3>City: {details.city}</h3>
                    <h3>Address: {details.address}</h3>
                    <h3>Listing type: {details.listing_type}</h3>
                    <h3>Property type:{details.property_type}</h3>
                    <h3>Square footage: {details.square_feet}</h3>
                    <h3>Bedrooms: {details.bedrooms}</h3>
                    <h3>Bathrooms: {details.bathrooms}</h3>
                </div>
                <div className="grid place-items-center">
                    <h3 >Description: {details.description}</h3>
                </div>
                <div className="pt-4">
                    <h3>Intrested in this property or need more info?</h3>
                    <h3 className="text-lg pt-2">Enter your info below and Puneet will contact you with next steps!</h3>
                    <ContactForm listing_id={details.id} />
                </div>
            </div>
        </div>

    )

}