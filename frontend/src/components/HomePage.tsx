import { Link } from "react-router-dom";
import Listings_Page from "./ListingsPage";
import ContactForm from "./ContactForm";

export default function HomePage() {
    return (
        <div>
            <section
                className="relative min-h-[60svh] md:min-h-[70vh] w-full bg-cover bg-no-repeat"
                style={{
                    backgroundImage: "url('/background.jpg')",
                    backgroundPosition: "center 25%",
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 grid min-h-[60svh] md:min-h-[70vh] w-full place-items-center p-4">
                    <div className="text-center ">
                        <h1 className="font-display text-gold text-6xl md:text-8xl font-bold pt-15 md:pb-5 ">
                            Team Chopra
                        </h1>

                        <h2 className="font-sans text-2xl md:text-3xl pt-1 mx-auto max-w-3xl text-white/85">
                            Your GTA Real Estate Experts bring 20 years of
                            award-winning experience to every deal — buying,
                            selling, or investing.
                        </h2>

                        <div className="grid grid-cols-2 pt-6 gap-6 pb-50 md:pb-20">
                            <Link
                                className="bg-blue-900 px-2 py-2 text-xl rounded-xl md:text-2xl hover:scale-105 transition-all"
                                to="/listings"
                            >
                                View Listings
                            </Link>

                            <Link
                                className="bg-blue-900 px-2 py-2 text-xl rounded-xl md:text-2xl hover:scale-105 transition-all"
                                to="/contact"
                            >
                                Contact Puneet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-navy/75 text-white py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 ">
                        <h3 className="font-display text-center text-3xl font-bold md:hidden">
                            About Team Chopra
                        </h3>
                        <img src="/teamchopra.jpg" alt="image" className="w-75 h-75 md:w-90 md:h-100 object-cover" />
                        <div>
                            <h3 className="font-display text-left text-2xl md:text-3xl font-bold pb-5 md:pb-10 hidden md:block">
                                About Team Chopra
                            </h3>
                            <p className="border-l-2 px-2 md:px-4 border-gold font-sans text-md md:text-xl text-left text-white/55">
                                With 17 years of real estate experience and multiple industry awards, Team Chopra
                                has built a reputation for trusted guidance, local expertise, and dedicated service throughout the GTA.
                                <br />
                                <br />
                                Whether you’re buying your first home, selling a property, or looking for your
                                next investment, Team Chopra is committed to making every step of the process clear, confident, and rewarding.
                            </p>

                            <div className="grid grid-cols-3 pt-4">
                                <div>
                                    <h3 className="font-display text-center text-gold font-bold text-4xl">500+</h3>
                                    <p className="font-display text-center text-xl text-white/55">House's Sold</p>
                                </div>
                                <div>
                                    <h3 className="font-display text-center text-gold font-bold text-4xl">17+</h3>
                                    <p className="font-display text-center text-xl text-white/55">Years of experience</p>
                                </div>
                                <div>
                                    <h3 className="font-display text-center text-gold font-bold text-4xl">500M+</h3>
                                    <p className="font-display text-center text-xl text-white/55">Total Sales Volume</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            <section className="bg-navy/75 text-white ">
                <ContactForm />
            </section>
            <section className="bg-navy-mid/75 text-white py-3">
                <Listings_Page />
            </section>
        </div>

    );
}