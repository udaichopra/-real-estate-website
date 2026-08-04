
import { Link } from "react-router-dom";
export default function NavBar(){
    return(
        <nav className=" sticky top-0  z-[4000] w-full flex flex-col md:flex-row justify-between items-center bg-blue-900 shadow-md">
            <Link className="flex justify-between items-center m-2 md:m-7 text-2xl font-bold"to="/">Puneet Chopra Real Estate</Link>
            <div className="flex justify-between items-center pr-7 gap-8 items-center">
                <h3></h3>
                <Link className="text-xl text-bold hover:scale-120 transition-all"to="/">Homepage</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/listings"> Listings</Link>
                <Link className="text-xl text-bold hover:scale-120 transition-all" to="/contact">Contact</Link>

            </div>
        </nav>

    )
}