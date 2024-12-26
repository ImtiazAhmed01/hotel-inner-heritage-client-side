import React, { useEffect, useState } from "react";
import img from '../../../src/assets/images/homeImg/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews from the server
        fetch("http://localhost:5000/reviews") // Update with your server's URL
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">User Reviews</h2>
            <div className="carousel w-full space-x-10">
                {reviews.map((review) => (
                    <div key={review._id} className="carousel-item flex-shrink-0">

                        <div className="card bg-base-200 shadow-xl p-6">
                            <img className="w-24 h-24" src={img} alt="" />
                            <p className="text-lg text-black pt-2 italic">{review.comment}</p>
                            <div className="mt-4">
                                <strong className="text-[#3F0113]">{review.user}</strong>
                                <span className="block text-sm text-gray-500">
                                    {new Date(review.date).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
