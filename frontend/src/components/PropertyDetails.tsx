import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import NavBar from "./Navbar";
import PropertyMap from "./PropertyMap";
export default function PropertyDetails() {

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
        latitude: number;
        longitude: number;
    };
    const [details, setDetails] = useState<Listing | null>(null);


    const { id } = useParams();

    const get_Details = async () => {
        const response = await fetch(`http://10.0.0.217:8000/api/listings/${id}`);
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
        <div className="grid place-items-center text-xl md:text-3xl text-center pt-5 ">
            <div>
                <div className="grid place-items-center pb-4">

                    <div className="relative">
                        <div className="absolute top-2 left-2 bg-blue-900 text-white px-4 py-2 rounded-xl text-lg font-bold">
                            {details.listing_type}
                        </div>

                        <img
                            src={details.image_url}
                            alt={details.address}
                            width="800"
                        />
                    </div>
                </div>
                <div className="grid text-left  text-2xl md:text-3xl font-bold00">
                    <h3>{details.address} , {details.city}, {details.province}</h3>
                    <h3>${details.price.toLocaleString("en-CA")}</h3>
                </div>
                <div className="grid text-left pt-5 pb-4 text-2xl md:text-3xl font-bold">
                    <h3>Property details:</h3>
                    <hr className="mt-2 border-gray-300" />
                </div>

                <div className="grid text-left gap-2 text-xl md:text-2xl ">
                    <h3>Square footage: {details.square_feet}</h3>
                    <h3>Bedrooms: {details.bedrooms}</h3>
                    <h3>Bathrooms: {details.bathrooms}</h3>
                    {details.description &&(
                        <div>
                        <h3 >Description:</h3>
                        <h3 >{details.description}</h3>
                        </div>
                    )}
                    
                </div>
                <div className="grid text-left pt-5 pb-4 text-2xl md:text-3xl font-bold">
                    <h3>Location:</h3>
                    <hr className="mt-2 border-gray-300" />
                </div>
    
                <div className="grid place-items-center mt-1">
                    <PropertyMap
                        latitude={details.latitude}
                        longitude={details.longitude}
                        address={`${details.address}, ${details.city}`}
                    />
                </div>
                <div className="pt-4">
                    <h3 className="font-bold">Interested in this property or need more info?</h3>
                    <h3 className="text-lg pt-1">Enter your info below and Puneet will contact you with next steps!</h3>
                    <hr className="mt-2 border-gray-300" />
                    <ContactForm listing_id={details.id} />
                </div>
            </div>
        </div>

    )

}