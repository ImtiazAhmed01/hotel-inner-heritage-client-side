import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/authProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import hsimg from "../../assets/images/HoneymoonSuite/80a89775765f24c1135e09aeaaa46f79.jpg";
import img1 from "../../../src/assets/images/SpecialOfferImg/images.jpg";
import img2 from "../../../src/assets/images/SpecialOfferImg/Melbourne Hotels and Apartments with Best Romantic Views - DoubleTree by Hilton Melbourne.jpg";
import img3 from "../../../src/assets/images/SpecialOfferImg/images (1).jpg";

const SpecialOffers = () => {
    const { user } = useContext(AuthContext); // Get user data from context
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        setSelectedOffer({
            title: "Our Premium Honeymoon Suite",
            description: "Book now at 35% off",
            imageUrl: hsimg,
        });
    }, []);

    const handleClaimOffer = (offer) => {
        if (user) {
            Swal.fire({
                title: "Offer Claimed!",
                text: `You have successfully claimed the "${offer.title}" offer.`,
                icon: "success",
                confirmButtonColor: "#DDA15E",
            });
        } else {
            Swal.fire({
                title: "Login Required",
                text: "You must be logged in to claim this offer.",
                icon: "warning",
                confirmButtonColor: "#DDA15E",
            });
        }
    };

    const handleModalClose = () => {
        setSelectedOffer(null);
        setShowPopup(false);
    };

    return (
        <section className="special-offers py-12 px-8" style={{ backgroundColor: "#FEFAE0" }}>
            <div className="text-center mb-10">
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-3xl font-bold" style={{ color: "#3F0113" }}>
                    Special Offers & Discounts
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-lg text-[#333533]">
                    Check out our latest offers and save big on your next stay!
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Winter Discount", description: "Get 25% off on all bookings made this winter season!", imageUrl: img1 },
                    { title: "Stay 3 Nights, Get 1 Free", description: "Book 3 nights and get the 4th night absolutely free.", imageUrl: img2 },
                    { title: "Early Bird Special", description: "Book your stay at least 30 days in advance and get 20% off.", imageUrl: img3 },
                ].map((offer, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.3, duration: 1 }} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={offer.imageUrl} alt={offer.title} className="w-full h-56 object-cover" />
                        <div className="p-6" style={{ color: "#333533" }}>
                            <h3 className="text-xl font-semibold" style={{ color: "#3F0113" }}>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <button className="mt-4 px-6 py-2 btn" style={{ backgroundColor: "#DDA15E", color: "#3F0113", border: "none" }} onClick={() => handleClaimOffer(offer)}>
                                Claim Offer
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showPopup && selectedOffer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: "#3F0113" }}>{selectedOffer.title}</h3>
                            <img src={hsimg} alt={selectedOffer.title} className="w-full h-56 object-cover mb-4" />
                            <p className="mb-4" style={{ color: "#333533" }}>{selectedOffer.description}</p>
                            <button className="px-4 py-2 rounded" style={{ backgroundColor: "#DDA15E", color: "#3F0113", border: "none" }} onClick={handleModalClose}>
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default SpecialOffers;
