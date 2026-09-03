import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AdminHome() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-display text-gold font-bold text-2xl md:text-3xl">Admin Dashboard</h3>
                    <p className="text-white/55 mt-2">Manage your listings from here.</p>
                </div>
                <button className="border rounded border-gold/75 text-white/70 px-4 py-2 hover:scale-105 transition-all" onClick={handleLogout}>Log Out</button>
            </div>
            <hr className="border-gold mt-4 mb-6 w-40" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/admin/newlisting" className="bg-navy-mid/50 rounded-2xl p-6 hover:scale-105 transition-all">
                    <h3 className="font-display text-xl font-bold text-gold">Add a New Listing</h3>
                    <p className="text-white/55 mt-2">Publish a new property to the site.</p>
                </Link>

                <Link to="/admin/viewlistings" className="bg-navy-mid/50 rounded-2xl p-6 hover:scale-105 transition-all">
                    <h3 className="font-display text-xl font-bold text-gold">Manage Listings</h3>
                    <p className="text-white/55 mt-2">View and edit the listings currently on the site.</p>
                </Link>
            </div>
        </div>
    );
}
