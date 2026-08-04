
import { Link } from "react-router-dom";
import Listings_Page from "./ListingsPage";
export default function HomePage() {
    return (
        <div className="grid place-items-center text-3xl h-full w-full p-1 md:p-4 ">
            <Link to="/"></Link>
            <h1 className="text-4xl md:text-5xl text-center font-bold w-full">Puneet Chopra</h1>
            <h1 className="text-2xl md:text-4xl text-center w-full pt-2">
                Your GTA Real Estate Expert brings 20 years of award-winning experience to every
                deal — buying, selling, or investing.</h1>
            <div className="grid grid-cols-2 pt-4 gap-6">
                <Link className=" bg-blue-900 px-2 py-2 text-center text-xl rounded-xl  md:text-2xl hover:scale-105 transition-all" to="/listings">View Listings</Link>
                <Link className=" bg-blue-900 px-2 py-2 text-center text-xl rounded-xl md:text-2xl hover:scale-105 transition-all" to="/contact">Contact Puneet</Link>
            </div>
            <div className="grid place-items-center w-full h-full pt-10">
                <Listings_Page />
            </div>
        </div>

    )
}
