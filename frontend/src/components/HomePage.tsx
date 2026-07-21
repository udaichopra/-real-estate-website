
import { Link } from "react-router-dom";
import Listings_Page from "./ListingsPage";
export default function HomePage() {
    return (
        <div className="grid place-items-center text-3xl h-full p-7 mt-6">
            <Link to="/"></Link>
            <h1 className="text-5xl text-center font-bold w-full">Puneet Chopra</h1>
            <h1 className="text-3xl text-center w-full pt-2">
                Your GTA Real Estate Expert brings 20 years of award-winning experience to every
                 deal — buying, selling, or investing.</h1>
            <div className="flex justify-between pt-10 w-96">
            <Link className="text-xl"to="/listings">View Listings</Link>
            <Link className="text-xl"to="/contact">Contact Puneet</Link>
            </div>
            <div className="grid place-items-centre text-3xl h-full pt-10">
                <Listings_Page/>
            </div>
        </div>
        
    )
}
