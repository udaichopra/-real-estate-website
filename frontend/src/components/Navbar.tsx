
import { Link } from "react-router-dom";
export default function NavBar(){
    return(
        <nav className="w-full flex justify-between items-center h-16 shadow-md bg-blue-500 text-black">
            <Link className="flex justify-between items-center p-14 text-2xl"to="/">Puneet Chopra Real Estate</Link>
            <div className="flex  pr-20 gap-8 items-center">
                <h3></h3>
                <Link className="text-xl text-bold hover:scale-120 transition-all"to="/">Homepage</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/listings"> Listings</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/contact">Contact</Link>

            </div>
        </nav>

    )
}