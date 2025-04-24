import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/authProvider';
import moment from 'moment';
import Swal from 'sweetalert2';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const { user, loading: userLoading } = useContext(AuthContext);

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
        const currentDate = moment();
        const bookingDate = moment(booking.bookingDate);
        const cancelDeadline = bookingDate.subtract(1, 'days');
        if (currentDate.isSameOrAfter(cancelDeadline)) {
            setSelectedBooking(booking);
            setCancelModalIsOpen(true);
        } else {
            cancelBooking(booking._id);
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
        setUpdateModalIsOpen(true);
    };

    const handleUpdateModalSubmit = async () => {
        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }
        await updateBookingDate(selectedBooking._id, selectedDate);
        setUpdateModalIsOpen(false);
    };

    const handleReviewClick = (booking) => {
        setSelectedBooking(booking);
        setReviewModalIsOpen(true);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const reviewData = {
            roomId: selectedBooking.roomId,
            roomName: selectedBooking.roomName,
            image: selectedBooking.roomImage,
            price: selectedBooking.price,
            rating,
            reviewText: review,
            userEmail: user.email,
            reviewer: user.displayName,
        };

        try {
            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Error submitting review');

            Swal.fire({
                icon: 'success',
                title: 'Review Submitted',
                text: result.message || 'Your review has been submitted successfully!',
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error submitting your review.',
            });
        }
    };

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (userLoading || loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

            <div className="overflow-x-auto lg:px-16">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b">
                                <td className="px-4 py-2">
                                    <img src={booking.roomImage} alt={booking.roomName} className="w-24 h-24 object-cover rounded-md" />
                                </td>
                                <td className="px-4 py-2 text-sm sm:text-base">{booking.roomName}</td>
                                <td className="px-4 py-2 text-sm sm:text-base">${booking.price}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button className="bg-[#DDA15E] text-[#3F0113] hover:bg-[#3F0113] hover:text-[#BC6C25] px-4 py-1 rounded-md"
                                            onClick={() => handleCancelClick(booking)}
                                        >Cancel</button>
                                        <button className="bg-[#DDA15E] text-[#3F0113] hover:bg-[#3F0113] hover:text-[#BC6C25] px-4 py-1 rounded-md"
                                            onClick={() => handleUpdateDate(booking)}
                                        >Update Date</button>
                                        <button className="bg-[#DDA15E] text-[#3F0113] hover:bg-[#3F0113] hover:text-[#BC6C25] px-4 py-1 rounded-md"
                                            onClick={() => handleReviewClick(booking)}
                                        >Give Review</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Modal for Cancellation Restriction */}
            {cancelModalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3">
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
                    <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Update Booking Date</h2>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
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

            {/* Modal for Giving Review */}
            {reviewModalIsOpen && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3">
                        <h2 className="text-xl font-semibold mb-4">
                            Hello, {user?.displayName || 'Guest'}! Give Review
                        </h2>
                        <img src={selectedBooking.roomImage} alt={selectedBooking.roomName} className="w-24" />
                        <p className="px-4 py-2">{selectedBooking.roomName}</p>

                        <textarea
                            className="border border-gray-300 p-2 w-full rounded-md mb-4"
                            placeholder="Write your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Rating</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="border border-gray-300 p-2 w-full rounded-md"
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <option key={star} value={star}>
                                        {star} Star{star > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">Timestamp: {moment().format('YYYY-MM-DD HH:mm:ss')}</span>
                        </div>
                        <div className="flex flex-wrap justify-between gap-2">
                            <button onClick={handleSubmitReview}>Submit Review</button>

                            <button
                                onClick={() => setReviewModalIsOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
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
