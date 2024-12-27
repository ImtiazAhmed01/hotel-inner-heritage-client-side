import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/authProvider';
import moment from 'moment';

const MyBookings = () => {
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false); // Review modal state
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5); // Default rating
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const { user } = useContext(AuthContext); // Access user from context
    const handleReviewClick = (booking) => {
        console.log("Selected booking for review:", booking); // Debugging
        setSelectedBooking(booking);
        setReviewModalIsOpen(true);
    };


    const fetchBookings = async () => {
        if (!user) {
            toast.error("You must be logged in to view bookings");
            return;
        }

        try {
            const userEmail = user?.email;
            const response = await fetch(`http://localhost:5000/user/bookings?userEmail=${userEmail}`);
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const data = await response.json();
            setBookings(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Failed to fetch bookings");
        }
    };

    const cancelBooking = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Failed to cancel booking");
            setBookings(bookings.filter((booking) => booking._id !== id));
            toast.success("Booking cancelled successfully");
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.error("Failed to cancel booking");
        }
    };

    const handleCancelClick = (booking) => {
        const currentDate = moment(); // Current date
        const bookingDate = moment(booking.bookingDate); // Booking date
        const cancelDeadline = bookingDate.subtract(1, 'days'); // Deadline for cancellation (1 day before booking)

        // If trying to cancel within less than 1 day of the booking date
        if (currentDate.isSameOrAfter(cancelDeadline)) {
            setSelectedBooking(booking); // Set the selected booking
            setCancelModalIsOpen(true); // Open the cancel modal
        } else {
            cancelBooking(booking._id); // Proceed with cancellation if valid
        }
    };

    const updateBookingDate = async (id, newDate) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newDate }),
            });
            if (!response.ok) throw new Error("Failed to update booking date");
            fetchBookings();
            toast.success("Booking date updated successfully");
        } catch (error) {
            console.error("Error updating booking date:", error);
            toast.error("Failed to update booking date");
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleUpdateDate = (booking) => {
        setSelectedBooking(booking);
        setUpdateModalIsOpen(true); // Open the update modal
    };

    const handleUpdateModalSubmit = async () => {
        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }
        await updateBookingDate(selectedBooking._id, selectedDate);
        setUpdateModalIsOpen(false);
    };
    const submitReview = async () => {
        if (!reviewText.trim()) {
            toast.error("Please enter a review.");
            return;
        }

        try {
            // Prepare review data
            const reviewData = {
                bookingId: selectedBooking._id,
                userEmail: user.email,
                reviewText: reviewText.trim(),
                rating: parseInt(rating), // Ensure the rating is a number
                timestamp: new Date().toISOString(),
            };

            console.log("Review data being sent:", reviewData); // Debugging

            // Send review to the backend
            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                throw new Error(errorData.error || "Unknown error");
            }

            toast.success("Review submitted successfully");
            setReviewModalIsOpen(false);
            setReviewText('');
            setRating(5);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review: " + error.message);
        }
    };



    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="border">
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td className="pl-16">
                                <img src={booking.roomImage} alt={booking.roomName} className="w-24" />
                            </td>
                            <td className="px-4 py-2">{booking.roomName}</td>
                            <td className="px-4 py-2">${booking.price}</td>
                            <td className="pl-">
                                <button
                                    className="bg-red-500 text-white ml-10 px-4 py-2 rounded-md mr-2"
                                    onClick={() => handleCancelClick(booking)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => handleUpdateDate(booking)}
                                >
                                    Update Date
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => handleReviewClick(booking)}
                                >
                                    Give Review
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Cancellation Restriction */}
            {cancelModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4 text-red-600">Cannot Cancel Booking</h2>
                        <p className="mb-4">
                            You cannot cancel this booking as it is less than 1 day before the check-in date.
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setCancelModalIsOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Updating Booking Date */}
            {updateModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Update Booking Date</h2>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]} // Restrict to today or future dates
                            className="border border-gray-300 p-2 w-full rounded-md mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdateModalSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save Date
                            </button>
                            <button
                                onClick={() => setUpdateModalIsOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {reviewModalIsOpen && (
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
            )}

        </div>
    );
};

export default MyBookings;
