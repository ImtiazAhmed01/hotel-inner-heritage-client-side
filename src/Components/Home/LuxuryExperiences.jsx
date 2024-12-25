import { motion } from "framer-motion";

const experiencesData = [
    {
        title: "Private Beach Dinner",
        description: "Indulge in a romantic dinner under the stars on a private beach.",
        image: "../../../src/assets/images/LuxuryExperiences/margaritaville-pool-sunrise.jpg",
    },
    {
        title: "Spa & Wellness",
        description: "Rejuvenate your body and mind with our exclusive spa treatments.",
        image: "../../../src/assets/images/LuxuryExperiences/1.jpg",
    },
    {
        title: "Luxury Yacht Cruise Service",
        description: "Explore the sea in style with our exclusive yacht packages.",
        image: "../../../src/assets/images/LuxuryExperiences/Masteka.jpg",
    },
];

const LuxuryExperiences = () => {
    return (
        <section
            className="luxury-experiences py-10 px-4 sm:px-8 lg:px-16"
            style={{ backgroundColor: "#FEFAE0" }}
        >
            <div className="text-center mb-8">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-3xl font-bold"
                    style={{ color: "#3F0113" }}
                >
                    Luxury Experiences
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg text-[#333533]"
                >
                    Elevate your stay with our premium experiences.
                </motion.p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {experiencesData.map((experience, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                        className="bg-white p-6 rounded-lg shadow-lg"
                    >
                        <img
                            src={experience.image}
                            alt={experience.title}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <h3
                            className="text-xl font-semibold mt-4"
                            style={{ color: "#3F0113" }}
                        >
                            {experience.title}
                        </h3>
                        <p className="text-[#333533] mt-2">{experience.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LuxuryExperiences;
