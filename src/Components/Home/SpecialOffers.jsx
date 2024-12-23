import { motion } from 'framer-motion';

const SpecialOffers = () => {
    const offers = [
        { title: "Winter Discount", description: "Get 25% off on all bookings made this winter season!", imageUrl: "../../../src/assets/images/SpecialOfferImg/images.jpg" },
        { title: "Stay 3 Nights, Get 1 Free", description: "Book 3 nights and get the 4th night absolutely free.", imageUrl: "../../../src/assets/images/SpecialOfferImg/Melbourne Hotels and Apartments with Best Romantic Views - DoubleTree by Hilton Melbourne.jpg" },
        { title: "Early Bird Special", description: "Book your stay at least 30 days in advance and get 20% off.", imageUrl: "../../../src/assets/images/SpecialOfferImg/images (1).jpg" },
    ];

    return (
        <section className="special-offers py-12" style={{ backgroundColor: "#FEFAE0" }}>
            <div className="text-center mb-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-3xl font-bold"
                    style={{ color: "#3F0113" }}
                >
                    Special Offers & Discounts
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg text-[#333533]"
                >
                    Check out our latest offers and save big on your next stay!
                </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((offer, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.3, duration: 1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <img src={offer.imageUrl} alt={offer.title} className="w-full h-56 object-cover" />
                        <div className="p-6" style={{ color: "#333533" }}>
                            <h3 className="text-xl font-semibold" style={{ color: "#3F0113" }}>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <button
                                className="mt-4 px-6 py-2 btn"
                                style={{
                                    backgroundColor: "#DDA15E",
                                    color: "#3F0113",
                                    border: "none",
                                }}
                            >
                                Claim Offer
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SpecialOffers;
