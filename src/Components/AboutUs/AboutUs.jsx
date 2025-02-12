import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <section className=" py-12 px-6 md:px-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-4xl font-bold text-[#3F0113] mb-4">Welcome to Hotel Inner Heritage</h2>
                <p className="text-lg text-[#3F0113]/70 mb-6">
                    Experience the charm of history blended with modern luxury. Our web platform allows you to explore our
                    heritage hotel, seamlessly book accommodations, and share your experiences.
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-semibold text-[#3F0113]/90">🏨 Luxurious Accommodations</h3>
                    <p className="text-gray-600 mt-2">Discover and book our beautifully designed heritage rooms with ease.</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-semibold text-[#3F0113]/90">🗺️ Interactive Experience</h3>
                    <p className="text-gray-600 mt-2">Explore our hotel location with an interactive map and dynamic visuals.</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-semibold text-[#3F0113]/90">📅 Easy Booking System</h3>
                    <p className="text-gray-600 mt-2">Book your stay effortlessly with date selection and booking summaries.</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-semibold text-[#3F0113]/90">⭐ Authentic Reviews</h3>
                    <p className="text-gray-600 mt-2">Read and post reviews with ratings, timestamps, and feedback.</p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AboutUs;
