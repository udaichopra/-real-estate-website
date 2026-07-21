
import { Link } from "react-router-dom";
export default function NavBar(){
    return(
        <nav className="w-full flex justify-between items-center h-16 shadow-md bg-gray-50 text-black">
            <Link className="flex justify-between items-center p-14"to="/">Puneet Chopra Real Estate</Link>
            <div className="flex  pr-20 gap-8 items-center">
                <h3></h3>
                <Link to="/">Homepage</Link>
                <Link to="/listings"> Listings</Link>
                <Link to="/contact">Contact</Link>

            </div>
        </nav>

    )
}