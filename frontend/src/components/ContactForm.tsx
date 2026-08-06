import { useEffect, useState } from "react";
import { API_URL } from "../config";
type ContactFormProps = {
    listing_id?: string;
    showIntro?: boolean;
};
export default function ContactForm({ listing_id, showIntro = false, }: ContactFormProps) {
    const [leads, setLeads] = useState({ full_name: "", email: "", phone: "", message: "", listing_id: "" });
    const [status, setStatus] = useState("");
    useEffect(() => {
        setLeads({ ...leads, listing_id: listing_id ?? "" })
    }, [listing_id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setLeads({ ...leads, [name]: value })
    }
    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault();
        if (leads.full_name.trim().length === 0) {
            return setStatus("Name field is empty");
        }
        if (leads.email.trim().length === 0) {
            return setStatus("Email field is empty");
        }

        try {
            const response = await fetch(`${API_URL}/api/leads`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(leads),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                setStatus(data.detail);
                return;
            }
            setStatus("Thanks! Puneet will contact you shortly!");
        } catch (error) {
            setStatus("Unable to connect to server.");
        }
    };
    setTimeout(() => {

        setStatus("");

    }, 3000);


    return (
        <form className="grid mx-auto flex max-w-md  m-2 p-2 px-5 flex-col gap-4 text-xl md:text-2xl">
            {showIntro===true && (
                <div>
                <h3 className="text-center text-md font-bold">Looking to buy, sell, or rent? </h3>
                <h3 className="text-center text-md mb-3">Fill out the form below, and Puneet will get back to you as soon as possible to discuss your real estate needs.</h3>
                <hr className="mb-2 border-gray-300"></hr>
                </div>
            )}
            <h3>Full-name:</h3><input className="flex border rounded-xl text-left" type="text" name="full_name" onChange={handleChange} ></input>
            <h3>Email:</h3><input className="flex border rounded-xl" type="text" name="email" onChange={handleChange} ></input>
            <h3>Phone: (Optional)</h3><input className="flex border rounded-xl" type="text" name="phone" onChange={handleChange} ></input>
            <h3>Message:(Optional)</h3><input className="flex border rounded-xl" type="text" name="message" onChange={handleChange} ></input>
            <h3>   </h3>
            <button className="grid bg-blue-900 rounded-xl text-center" type="button" onClick={handleClick}>Submit your inquiry</button>
            {status && (
                <h3 className="text-center text-blue-500">{status}</h3>
            )}
        </form>

    )

}
