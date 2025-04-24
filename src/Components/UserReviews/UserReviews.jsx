import React, { useEffect, useState } from "react";
import img from '../../../src/assets/images/homeImg/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">User Reviews</h2>
            <div className="carousel w-full flex gap-6 overflow-x-auto">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="carousel-item flex-shrink-0 w-80 h-72"
                    >
                        <div className="card bg-base-200 shadow-xl p-6 flex flex-col items-center justify-between w-full h-full">
                            <img className="w-24 h-24 rounded-full object-cover" src={img} alt="User" />

                            {/* Fixed height text area */}
                            <p className="text-lg  pt-2 italic text-center h-16 overflow-hidden line-clamp-3">
                                {review.reviewText}
                            </p>

                            <div className="mt-4 text-center">
                                <strong className="">{review.reviewer}</strong>
                                <span className="block text-sm text-gray-500">
                                    {new Date(review.timestamp).toLocaleString()}
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


//  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false); // Review modal state
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState(5); // Default rating

// const handleReviewClick = (booking) => {
//     console.log("Selected booking for review:", booking); // Debugging
//     setSelectedBooking(booking);
//     setReviewModalIsOpen(true);
// };
// const submitReview = async () => {
//     if (!reviewText.trim()) {
//         toast.error("Please enter a review.");
//         return;
//     }

//     try {
//         // Prepare review data
//         const reviewData = {
//             bookingId: selectedBooking._id,
//             userEmail: user.email,
//             reviewText: reviewText.trim(),
//             rating: parseInt(rating), // Ensure the rating is a number
//             timestamp: new Date().toISOString(),
//         };

//         console.log("Review data being sent:", reviewData); // Debugging

//         // Send review to the backend
//         const response = await fetch('http://localhost:5000/reviews', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(reviewData),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Backend error:", errorData);
//             throw new Error(errorData.error || "Unknown error");
//         }

//         toast.success("Review submitted successfully");
//         setReviewModalIsOpen(false);
//         setReviewText('');
//         setRating(5);
//     } catch (error) {
//         console.error("Error submitting review:", error);
//         toast.error("Failed to submit review: " + error.message);
//     }
// };

{/* {reviewModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Give Review</h2>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            className="border border-gray-300 p-2 w-full rounded-md mb-4"
                        />
                        <div className="flex items-center mb-4">
                            <label className="mr-2">Rating:</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md"
                            >
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <option key={r} value={r}>
                                        {r} Star{r > 1 && 's'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={submitReview}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Submit Review
                            </button>
                            <button
                                onClick={() => setReviewModalIsOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}