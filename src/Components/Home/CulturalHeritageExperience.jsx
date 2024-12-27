import React, { useState, useEffect } from 'react';
import img1 from '../../assets/images/CulturalExperiences/COOKING-CLASS-Hoiana-2500x1200-1.webp'
import img2 from '../../assets/images/CulturalExperiences/ea543a08aa9a66a613126d4566be1ec7.jpeg'
import img3 from '../../assets/images/CulturalExperiences/avv15qsam34drkvrue6j.jpg'

const CulturalHeritageExperience = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [cardsHovered, setCardsHovered] = useState([false, false, false]);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleHover = (index) => {
        const newCardsHovered = [...cardsHovered];
        newCardsHovered[index] = true;
        setCardsHovered(newCardsHovered);
    };

    const handleMouseOut = (index) => {
        const newCardsHovered = [...cardsHovered];
        newCardsHovered[index] = false;
        setCardsHovered(newCardsHovered);
    };

    return (
        <div className="text-center py-10 px-5">
            <section
                className={`${fadeIn ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-1500`}
            >
                <h2
                    className={`text-4xl font-bold text-brown-700 ${fadeIn ? 'transform translate-y-0' : 'transform translate-y-5'
                        } transition-all duration-1500`}
                >
                    Experience Our Cultural Heritage
                </h2>
                <p
                    className={`text-lg text-brown-600 mt-5 mb-8 ${fadeIn ? 'transform translate-y-0' : 'transform translate-y-5'
                        } transition-all duration-2000`}
                >
                    Discover the charm of our heritage with authentic local experiences.
                    Immerse yourself in age-old traditions and create memories to last a
                    lifetime.
                </p>

                <div
                    className={`flex justify-center px-5 gap-8 mt-8 ${fadeIn ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-1500`}
                >
                    <div
                        className={`bg-[#DDA15E] p-6 rounded-lg shadow-lg w-1/3 transition-transform duration-300 transform ${cardsHovered[0] ? 'scale-105' : 'scale-100'
                            }`}
                        onMouseEnter={() => handleHover(0)}
                        onMouseLeave={() => handleMouseOut(0)}
                    >
                        <img src={img1} className='rounded-lg mb-2' alt="" />
                        <h3 className="text-2xl text-brown-700">Traditional Cooking Classes</h3>
                        <p className="text-md text-gray-600 mt-3">
                            Join our chefs for an interactive session on preparing traditional
                            regional dishes using local ingredients.
                        </p>
                    </div>

                    <div
                        className={`bg-[#DDA15E] p-6 rounded-lg shadow-lg w-1/3 transition-transform duration-300 transform ${cardsHovered[1] ? 'scale-105' : 'scale-100'
                            }`}
                        onMouseEnter={() => handleHover(1)}
                        onMouseLeave={() => handleMouseOut(1)}
                    >
                        <img src={img2} className='rounded-lg mb-2 h-52 w-full' alt="" />
                        <h3 className="text-2xl text-brown-700">Guided Heritage Tours</h3>
                        <p className="text-md text-gray-600 mt-3">
                            Explore the history and heritage of our region through guided
                            tours to historical sites and landmarks.
                        </p>
                    </div>

                    <div
                        className={`bg-[#DDA15E] p-6 rounded-lg shadow-lg w-1/3 transition-transform duration-300 transform ${cardsHovered[2] ? 'scale-105' : 'scale-100'
                            }`}
                        onMouseEnter={() => handleHover(2)}
                        onMouseLeave={() => handleMouseOut(2)}
                    >
                        <img src={img3} className='rounded-lg mb-2 h-52' alt="" />
                        <h3 className="text-2xl text-brown-700">Art & Craft Workshops</h3>
                        <p className="text-md text-gray-600 mt-3">
                            Unleash your creativity and learn local arts and crafts under the
                            guidance of talented artisans.
                        </p>
                    </div>
                </div>

                <button
                    className={`mt-8 bg-brown-700 text-white py-3 px-6 rounded-lg ${fadeIn ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-2000`}
                >
                    Book Your Experience
                </button>
            </section>
        </div>
    );
};

export default CulturalHeritageExperience;
