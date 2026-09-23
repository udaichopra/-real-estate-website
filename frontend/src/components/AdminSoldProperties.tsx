import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

type SoldProperty = {
    id: string;
    address: string;
    city: string;
    sale_price: number;
    closing_date: string;
    buyer_name: string | null;
    buyer_email: string | null;
    buyer_phone: string | null;
    transaction_type: string;
    notes: string | null;
};

export default function AdminSoldProperties() {
    const [soldProperties, setSoldProperties] = useState<SoldProperty[]>([]);

    useEffect(() => {
        const getSoldProperties = async () => {
            const response = await fetch(`${API_URL}/admin/soldproperties`);
            const data = await response.json();
            setSoldProperties(data);
        };
        getSoldProperties();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/admin" className="text-gold/75 hover:text-gold text-sm">← Back to Dashboard</Link>
            <h3 className="font-display text-gold font-bold text-2xl md:text-3xl mt-4">Sold Properties</h3>
            <hr className="border-gold mt-4 mb-6 w-40" />

            {soldProperties.length === 0 && (
                <p className="text-white/55">No sold properties logged yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {soldProperties.map((property) => (
                    <div className="bg-navy-mid/50 rounded-2xl p-5 text-left" key={property.id}>
                        <h3 className="font-display text-xl font-bold">{property.address}</h3>
                        <p className="text-white/55">{property.city}</p>
                        <p className="text-gold text-lg mt-1">${property.sale_price.toLocaleString("en-CA")}</p>
                        <p className="text-white/55 text-sm">{property.transaction_type} • Closed {property.closing_date}</p>
                        <hr className="border-white/10 my-3" />
                        <p className="text-white/70 text-sm">Buyer: {property.buyer_name || "Not provided"}</p>
                        {property.buyer_email && <p className="text-white/55 text-sm">{property.buyer_email}</p>}
                        {property.buyer_phone && <p className="text-white/55 text-sm">{property.buyer_phone}</p>}
                        {property.notes && <p className="text-white/55 text-sm mt-2">{property.notes}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
