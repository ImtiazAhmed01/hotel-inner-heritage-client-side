import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slider1Image from "../../../src/assets/images/homeImg/300142_14090419010021868663.jpg";
import slider2Image from "../../../src/assets/images/homeImg/;kgds; (7).jpg";
import slider3Image from "../../../src/assets/images/homeImg/sfgdfg (5).jpg";
import slider4Image from "../../../src/assets/images/homeImg/;kgds; (3).jpg";
import HotelMap from './HotelMap';
// import FeaturedRooms from './FeaturedRooms';
import SpecialOffers from './SpecialOffers';
import LuxuryExpeiences from './LuxuryExperiences';
import FeaturedRooms from './FeaturedRooms';
import UserReviews from '../UserReviews/UserReviews';
import CulturalHeritageExperience from './CulturalHeritageExperience';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleRedirect = () => {
        navigate('/roomspage'); // Redirect to the Rooms page
    };

    return (
        <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
            <div className="md:px-14 lg:px-32 py-4">
                <div>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>

                {/* Slider Section */}
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={slider1Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Discover Luxurious Stays</h2>
                            <p>Experience comfort and elegance with our carefully curated rooms designed to make you feel at home.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={slider2Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Unmatched Hospitality</h2>
                            <p>Let our dedicated staff provide personalized services that create unforgettable memories.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    {/* Slide 3 */}
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={slider3Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Your Comfort, Our Priority</h2>
                            <p>Relax in our premium accommodations featuring modern amenities and breathtaking views.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    {/* Slide 4 */}
                    <div id="slide4" className="carousel-item relative w-full">
                        <img src={slider4Image} className="w-full h-[500px] object-contain" />
                        <div className="absolute text-center inset-x-0 bottom-8 bg-opacity-70 bg-black text-white py-4 px-6">
                            <h2 className="text-xl font-bold">Book Your Dream Stay Today</h2>
                            <p>Find the perfect room for your next getaway, tailored to fit your needs and style.</p>
                            <button
                                onClick={handleRedirect}
                                className="mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                            >
                                Go to Rooms
                            </button>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
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


            {/* Featured rooms */}
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <FeaturedRooms></FeaturedRooms>
            </div>

            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-[#DDA15E] text-black"}`}>
                <UserReviews></UserReviews>
            </div>

            {/* Other sections of the Home page */}

            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <LuxuryExpeiences></LuxuryExpeiences>
            </div>
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <SpecialOffers />
            </div>
            <div className={`mt-8 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                <CulturalHeritageExperience></CulturalHeritageExperience>
            </div>

        </div>
    );
};

export default Home;
