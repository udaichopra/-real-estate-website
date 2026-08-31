type Listing = {
    id: string;
    image_url: string;
    address: string;
    city: string;
    price: number;
    listing_type: string;
};
type ListingsFilterProps = {
    setlistings: React.Dispatch<React.SetStateAction<Listing[]>>;
    getListings: () => Promise<void>;
};
import { useState } from "react";

import { API_URL } from "../config";


export default function ListingsFilter({ setlistings, getListings }: ListingsFilterProps) {
    const [ListingFilter, setListingFilter] = useState({ listing_type: "", property_type: "", city: "", bedrooms: "", bathrooms: "", min_price: "", max_price: "" });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setListingFilter({ ...ListingFilter, [name]: value })

    }
    const clearFilter = () => {
        setListingFilter({ listing_type: "", property_type: "", city: "", bedrooms: "", bathrooms: "", min_price: "", max_price: "" });
        getListings();
    }
    const handleFilter = async () => {
        const params = new URLSearchParams();

        if (ListingFilter.listing_type !== "") {
            params.append("listing_type", ListingFilter.listing_type);
        }

        if (ListingFilter.property_type !== "") {
            params.append("property_type", ListingFilter.property_type);
        }

        if (ListingFilter.city !== "") {
            params.append("city", ListingFilter.city);
        }

        if (ListingFilter.min_price !== "") {
            params.append("min_price", ListingFilter.min_price);
        }

        if (ListingFilter.max_price !== "") {
            params.append("max_price", ListingFilter.max_price);
        }

        if (ListingFilter.bedrooms !== "") {
            params.append("bedrooms", ListingFilter.bedrooms);
        }

        if (ListingFilter.bathrooms !== "") {
            params.append("bathrooms", ListingFilter.bathrooms);
        }

        const response = await fetch(
            `${API_URL}/api/listings?${params.toString()}`
        );

        const data = await response.json();

        console.log(data);
        setlistings(data);
    };
    return (
        <div>
            <h3 className="font-display text-left text-3xl md:text-4xl font-bold pt-5 md:pt-10 mx-10 md:mx-30">Team Chopra's Current Listings</h3>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center text-left text-lg md:text-xl p-5">
                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="listing_type" onChange={handleChange}>
                    <option value="">All Listings</option>
                    <option value="For Sale"> For Sale </option>
                    <option value="For lease" > For Lease </option>
                </select>

                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="property_type" onChange={handleChange}>
                    <option value="">All Property Types</option>
                    <option value="Detached"> Detached </option>
                    <option value="Semi-Detached" > Semi-Detached </option>
                    <option value="townhouse" > townhouse </option>
                    <option value="condo" > Condo </option>
                </select>

                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="min_price" onChange={handleChange}>
                    <option value="">No Min Price</option>
                    <option value="300000">$300,000</option>
                    <option value="500000">$500,000</option>
                    <option value="750000">$750,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="2000000">$2,000,000</option>
                </select>

                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="max_price" onChange={handleChange}>
                    <option value="">No Max Price</option>
                    <option value="500000">$500,000</option>
                    <option value="750000">$750,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="2000000">$2,000,000</option>
                    <option value="3000000">$3,000,000</option>
                </select>
                <input className="border rounded border-gold p-2 bg-navy/75" placeholder="City" type="text" name="city" value={ListingFilter.city} onChange={handleChange}></input>
                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="bedrooms" onChange={handleChange}>
                    <option value="">Any Beds</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                </select>
                <select className="border rounded border-gold/75 p-2 bg-navy/75" name="bathrooms" onChange={handleChange}>
                    <option value="">Any Bathrooms</option>
                    <option value="1">1+ Bathrooms</option>
                    <option value="2">2+ Bathrooms</option>
                    <option value="3">3+ Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                    <option value="5">5+ Bathrooms</option>
                </select>

            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center text-left p-3 ">
                <button className="border rounded bg-gold/75 p-1" type="button" onClick={handleFilter}> Apply filters </button>
                <button className="border rounded bg-gold/75 p-1" type="button" onClick={clearFilter}> Clear filters </button>
            </div>
        </div>


    )

}