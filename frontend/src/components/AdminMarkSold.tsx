import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

type Listing = {
    id: string;
    image_url: string;
    address: string;
    city: string;
};

export default function AdminMarkSold() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState<Listing | null>(null);
    const [soldInfo, setSoldInfo] = useState({
        sale_price: "", closing_date: "", buyer_name: "", buyer_email: "",
        buyer_phone: "", transaction_type: "Seller Representation", notes: ""
    });
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch(`${API_URL}/api/listings/${id}`);
            const data = await response.json();
            setListing(data[0]);
        };
        fetchListing();
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setSoldInfo({ ...soldInfo, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!listing) {
            return;
        }

        const response = await fetch(`${API_URL}/admin/markassold`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listing_id: listing.id,
                address: listing.address,
                city: listing.city,
                sale_price: Number(soldInfo.sale_price),
                closing_date: soldInfo.closing_date,
                buyer_name: soldInfo.buyer_name || null,
                buyer_email: soldInfo.buyer_email || null,
                buyer_phone: soldInfo.buyer_phone || null,
                transaction_type: soldInfo.transaction_type,
                notes: soldInfo.notes || null,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            setStatus(data.detail || "Unable to mark this listing as sold.");
            return;
        }

        setStatus("Listing marked as sold.");
        setTimeout(() => {
            navigate("/admin/viewlistings");
        }, 1500);
    };

    const inputClass = "border rounded border-gold/75 bg-navy/75 text-white px-3 py-2 focus:outline-none focus:border-gold";
    const labelClass = "text-white/55 text-sm md:text-base";

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/admin/viewlistings" className="text-gold/75 hover:text-gold text-sm">← Back to Manage Listings</Link>
            <h3 className="font-display text-gold font-bold text-2xl md:text-3xl mt-4">Mark Listing as Sold</h3>
            <hr className="border-gold mt-4 mb-6 w-40" />

            {listing && (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <p className="text-white/55">{listing.address}, {listing.city}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Sale Price</label>
                            <input className={inputClass} type="number" name="sale_price" value={soldInfo.sale_price} onChange={handleChange} required></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Closing Date</label>
                            <input className={inputClass} type="date" name="closing_date" value={soldInfo.closing_date} onChange={handleChange} required></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Buyer Name</label>
                            <input className={inputClass} type="text" name="buyer_name" value={soldInfo.buyer_name} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Transaction Type</label>
                            <select className={inputClass} name="transaction_type" value={soldInfo.transaction_type} onChange={handleChange}>
                                <option value="Seller Representation">Seller Representation</option>
                                <option value="Buyer Representation">Buyer Representation</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Buyer Email</label>
                            <input className={inputClass} type="email" name="buyer_email" value={soldInfo.buyer_email} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={labelClass}>Buyer Phone</label>
                            <input className={inputClass} type="text" name="buyer_phone" value={soldInfo.buyer_phone} onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className={labelClass}>Notes</label>
                            <textarea className={`${inputClass} min-h-32`} name="notes" value={soldInfo.notes} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <p className="text-white/55 text-sm">Marking this as sold will remove it from your active listings and log it here.</p>

                    <button className="self-start bg-gold/75 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all" type="submit">Mark as Sold</button>
                    {status && <p className="text-white/70">{status}</p>}
                </form>
            )}
        </div>
    );
}
