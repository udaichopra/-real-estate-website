import { useState } from "react";
export default function ContactForm() {
    const [leads, setLeads] = useState({ full_name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState("");
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLeads({ ...leads, [name]: value })
    }
    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault();
        if (leads.full_name.trim().length===0){
            return setStatus("Name field is empty");
        }
        if (leads.email.trim().length===0){
            return setStatus("Email field is empty");
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/leads",
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
            setStatus("Lead submitted successfully!");
        } catch (error) {
            setStatus("Unable to connect to server.");
        }
    };


    return (
        <form>
            <h3>Fullname:</h3><input type="text" name="full_name" onChange={handleChange} ></input>
            <h3>Email:</h3><input type="text" name="email" onChange={handleChange} ></input>
            <h3>Phone: (optional)</h3><input type="text" name="phone" onChange={handleChange} ></input>
            <h3>Message:(optional)</h3><input type="text" name="message" onChange={handleChange} ></input>
            <h3>   </h3>
            <button type="button" onClick={handleClick}>Sumbit your inquiry</button>
            <h3>{status}</h3>
        </form>

    )

}
