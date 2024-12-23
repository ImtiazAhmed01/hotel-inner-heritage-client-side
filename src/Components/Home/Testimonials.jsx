import { motion } from 'framer-motion';

const Testimonials = () => {
    const testimonials = [
        { name: "John Doe", feedback: "Amazing experience! Highly recommend it.", image: "../../../src/assets/images/TestimonialImg/man-in-lobby@2x.jpg" },
        { name: "Jane Smith", feedback: "The best stay I've ever had. Wonderful service!", image: "../../../src/assets/images/TestimonialImg/Female-friendly-hospitality-how-to-appeal-to women-1bis.jpeg" },
        { name: "Mark Johnson", feedback: "Incredible hospitality. Would visit again!", image: "../../../src/assets/images/TestimonialImg/photo5jpg.jpg" },
    ];

    return (
        <section className="testimonials bg-gray-100 py-10" style={{ backgroundColor: "#FEFAE0" }}>
            <div className="text-center mb-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-3xl font-bold"
                    style={{ color: "#3F0113" }}
                >
                    What Our Guests Say
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg text-[#333533]"
                >
                    Hear from our satisfied guests about their unforgettable experiences.
                </motion.p>
            </div>
            <div className="flex justify-center space-x-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-72"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <p className="text-lg font-semibold" style={{ color: "#3F0113" }}>{testimonial.name}</p>
                        </div>
                        <p className="text-[#333533]">{testimonial.feedback}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
