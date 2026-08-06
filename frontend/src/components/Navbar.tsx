
import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <nav className=" sticky top-0  z-[4000] w-full flex flex-col md:flex-row justify-between items-center bg-blue-900 shadow-md">
            <Link className="flex justify-between items-center m-1 md:m-7 text-2xl font-bold" to="/">
            <img
                src="/logo.png"
                alt="Puneet Chopra Real Estate Logo"
                className="h-12 md:h-16 w-auto px-5"
            />
            <h3 className="pt-3 md:pt-5 text-center text-xl md:text-2xl">Puneet Chopra Real Estate</h3>
           </Link>
            
            <div className="flex justify-between items-center  pt-3 pb-4 pr-7 gap-8 items-center">
                <h3></h3>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/">Homepage</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/listings"> Listings</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/contact">Contact</Link>

            </div>
        </nav>

    )
}