
import { Link } from "react-router-dom";
import Listings_Page from "./ListingsPage";
export default function HomePage() {
    return (
        <div className="grid place-items-center text-3xl h-full w-full p-7 mt-6">
            <Link to="/"></Link>
            <h1 className="text-5xl text-center font-bold w-full">Puneet Chopra</h1>
            <h1 className="text-3xl text-center w-full pt-2">
                Your GTA Real Estate Expert brings 20 years of award-winning experience to every
                 deal — buying, selling, or investing.</h1>
            <div className="grid grid-cols-2 pt-4 gap-6">
            <Link className="grid bg-blue-500 text-center text-2xl rounded-4xl hover:scale-120 transition-all"to="/listings">View Listings</Link>
            <Link className="grid bg-blue-500 text-2xl rounded-4xl hover:scale-120 transition-all"to="/contact">Contact Puneet</Link>
            </div>
            <div className="grid place-items-centre text-3xl w-full h-full pt-10">
                <Listings_Page/>
            </div>
        </div>
        
    )
}
