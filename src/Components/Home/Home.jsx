import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import slider2Image from "../../../src/assets/images/homeImg/;kgds; (7).jpg";
import slider3Image from "../../../src/assets/images/homeImg/sfgdfg (5).jpg";
import slider4Image from "../../../src/assets/images/homeImg/;kgds; (3).jpg";
import HotelMap from "./HotelMap";
import SpecialOffers from "./SpecialOffers";
import LuxuryExpeiences from "./LuxuryExperiences";
import FeaturedRooms from "./FeaturedRooms";
import UserReviews from "../UserReviews/UserReviews";
import CulturalHeritageExperience from "./CulturalHeritageExperience";

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleRedirect = () => {
        navigate("/roomspage");
    };

    const smoothScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    return (
        <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
            <div className="md:px-14 lg:px-32 py-4">
                <div>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
                            }`}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>

                {/* Slider Section */}
                <div className="carousel w-full">
                    {/* Slide 1 */}
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={slider4Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Book Your Dream Stay Today</h2>
                            <p>Find the perfect room for your next getaway.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <button onClick={() => smoothScroll("slide3")} className="btn btn-circle">
                                ❮
                            </button>
                            <button onClick={() => smoothScroll("slide2")} className="btn btn-circle">
                                ❯
                            </button>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={slider2Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Unmatched Hospitality</h2>
                            <p>Let our staff provide personalized services.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <button onClick={() => smoothScroll("slide1")} className="btn btn-circle">
                                ❮
                            </button>
                            <button onClick={() => smoothScroll("slide3")} className="btn btn-circle">
                                ❯
                            </button>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={slider3Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Your Comfort, Our Priority</h2>
                            <p>Relax in our premium accommodations.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <button onClick={() => smoothScroll("slide2")} className="btn btn-circle">
                                ❮
                            </button>
                            <button onClick={() => smoothScroll("slide1")} className="btn btn-circle">
                                ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Location */}
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <h2 className="text-center text-2xl font-bold mb-4">Our Location</h2>
                <div className="map-container mx-auto" style={{ height: "400px", width: "90%" }}>
                    <HotelMap />
                </div>
            </div>

            {/* Featured Rooms */}
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <FeaturedRooms />
            </div>

            {/* User Reviews */}
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-[#DDA15E] text-black"}`}>
                <UserReviews />
            </div>

            {/* Other Sections */}
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <LuxuryExpeiences />
            </div>
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <SpecialOffers />
            </div>
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <CulturalHeritageExperience />
            </div>
        </div>
    );
};

export default Home;
