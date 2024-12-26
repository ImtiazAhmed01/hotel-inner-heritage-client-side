import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/authProvider';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { user } = useContext(AuthContext); // Access user from context

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
        const confirm = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirm) return;

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
        setModalIsOpen(true);
    };

    const handleModalSubmit = async () => {
        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }
        await updateBookingDate(selectedBooking._id, selectedDate);
        setModalIsOpen(false);
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
                <tbody className='border'>
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
                                    onClick={() => cancelBooking(booking._id)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => handleUpdateDate(booking)}
                                >
                                    Update Date
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                                    <a href={`/reviews/${booking._id}`}>Review</a>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Date Picker */}
            {modalIsOpen && (
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
                                onClick={handleModalSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save Date
                            </button>
                            <button
                                onClick={() => setModalIsOpen(false)}
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
