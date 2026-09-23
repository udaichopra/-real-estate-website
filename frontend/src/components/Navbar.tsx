
import { Link } from "react-router-dom";
import { useState } from "react";
export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-[4000] w-full bg-navy-mid shadow-md">
            <div className="flex justify-between items-center py-3">
                <Link className="flex justify-between items-center text-2xl font-bold" to="/">
                <img
                    src="/logo.png"
                    alt="Puneet Chopra Real Estate Logo"
                    className="h-12 md:h-16 w-auto px-5"
                />
                <h3 className=" text-center text-xl md:text-2xl">Team Chopra Real Estate</h3>
               </Link>

                <button className="md:hidden px-5 text-3xl text-gold" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? "✕" : "☰"}
                </button>

                <div className="hidden md:flex items-center gap-8 px-5">
                    <Link className="text-xl font-bold hover:scale-120 transition-all" to="/">Homepage</Link>
                    <Link className="text-xl font-bold hover:scale-120 transition-all" to="/listings"> Listings</Link>
                    <Link className="text-xl font-bold hover:scale-120 transition-all" to="/contact">Contact</Link>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 pb-4">
                    <Link className="text-xl font-bold" to="/" onClick={() => setMenuOpen(false)}>Homepage</Link>
                    <Link className="text-xl font-bold" to="/listings" onClick={() => setMenuOpen(false)}> Listings</Link>
                    <Link className="text-xl font-bold" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </nav>

    )
}
