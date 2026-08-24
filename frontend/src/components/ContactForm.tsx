import { useEffect, useState } from "react";
import { API_URL } from "../config";
type ContactFormProps = {
    listing_id?: string;
    showIntro?: boolean;
    heading?: string;
};
export default function ContactForm({ listing_id, showIntro = false, heading="Ready to Buy, Sell, or Rent?" }: ContactFormProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">



            <div className="bg-navy-mid/75 px-6 py-10 md:px-10 md:py-20">
                <h3 className=" my-5 md:mx-6 text-left font-display text-gold font-bold text-3xl md:text-4xl font-bold max-w-100 ">
                    {heading}
                </h3>


                <h3 className="text-left md:mt-4 md:mx-6  text-white/55 max-w-90 text-lg md:text-xl">Fill out the form and Team Chopra will reach out to you within one business day to dicuss your real estate needs.</h3>
                <hr className="border-gold m-1 mt-3 border-2xl w-40 md:mx-6 "></hr>
                <h3 className="text-white text-xl md:mx-6 mt-5">Team Chopra's Contact info</h3>
                <h3 className="text-white/55 md:mx-6 mt-5">Phone</h3>
                <h3 className="text-white md:mx-6 mt-1">416-454-4450</h3>
                <h3 className="text-white/55 md:mx-6 mt-7">Email</h3>
                <h3 className="text-white md:mx-6 mt-1">turningyourdreams@gmail.com</h3>
                <h3 className="text-white/55 md:mx-6 mt-7">Brokerage</h3>
                <h3 className="text-white md:mx-6 mt-1">Homelife Miracle</h3>
            </div>



            <form className="mx-auto flex w-full max-w-md flex-col gap-4 px-6 md:px-1 py-10 md:py-20" onSubmit={handleClick}>
                <h3 className="font-display font-bold pt-5 text-gold text-3xl md:text-4xl">Send Us a Message</h3>
                <h3 className="mt-5">Full name:</h3><input className="flex text-left text-white/50 text-md md:text-lg" type="text" name="full_name" placeholder="John Smith" onChange={handleChange} ></input>
                <hr className="border-white/50"></hr>
                <h3>Email:</h3><input className="text-white/50 text-md md:text-lg" type="text" name="email" placeholder="johnsmith@example.com" onChange={handleChange} ></input>
                <hr className="border-white/50"></hr>
                <h3>Phone: </h3><input className="text-white/50 text-md md:text-lg" type="text" name="phone" placeholder="(416) 555-0123 (Optional)" onChange={handleChange} ></input>
                <hr className="border-white/50"></hr>
                <h3>Message:</h3><input className="text-white/50 mb-10 text-md md:text-lg" type="text" name="message" placeholder="Tell us what you're looking for... (Optional)" onChange={handleChange} ></input>
                <hr className="border-white/50"></hr>
                <button className="self-center bg-gold/75 rounded-xl px-6 py-2 text-center font-display items-center" type="button" onClick={handleClick}>Submit your inquiry</button>
                {status && (
                    <h3 className="text-center text-blue-500">{status}</h3>
                )}
            </form>

        </div>

    )

}
