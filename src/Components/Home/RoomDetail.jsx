import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import img from '../../../src/assets/images/homeImg/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';

const RoomDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [room, setRoom] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [bookingDate, setBookingDate] = useState(null); // Single-day booking
    const [isCheckInOpen, setCheckInOpen] = useState(false);
    const [isCheckOutOpen, setCheckOutOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${id}`)
            .then((res) => res.json())
            .then((data) => setRoom(data))
            .catch((error) => console.error('Error fetching room details:', error));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/reviews?roomId=${id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error('Error fetching reviews:', error));
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            Swal.fire({
                title: 'You need to be logged in to book a room.',
                icon: 'warning',
                confirmButtonText: 'OK',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.zIndex = 9999;
                }
            });
            navigate('/login');
            return;
        }

        if (!room.availability) {
            Swal.fire({
                title: 'This room is currently unavailable.',
                icon: 'warning',
                confirmButtonText: 'OK',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.zIndex = 9999;
                }
            });
            return;
        }

        if (!checkInDate || !checkOutDate || !bookingDate) {
            Swal.fire({
                title: 'Please select check-in, check-out, and single booking dates.',
                icon: 'warning',
                confirmButtonText: 'OK',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.zIndex = 9999;
                }
            });
            return;
        }

        // Close the modal before showing SweetAlert
        document.getElementById('my_modal_5').close();

        fetch(`http://localhost:5000/rooms/${id}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkInDate: checkInDate.toISOString().split('T')[0],
                checkOutDate: checkOutDate.toISOString().split('T')[0],
                bookingDate: bookingDate.toISOString().split('T')[0],
                userId: user.id,
                userEmail: user.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Check if the booking was successful
                if (data.availability === true) {
                    Swal.fire({
                        title: 'Room booked successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        didOpen: () => {
                            document.querySelector('.swal2-popup').style.zIndex = 9999;
                        }
                    });
                    setRoom((prev) => ({ ...prev, availability: false }));
                } else {
                    Swal.fire({
                        title: data.message || 'Booking failed!',
                        confirmButtonText: 'OK',
                        didOpen: () => {
                            document.querySelector('.swal2-popup').style.zIndex = 9999;
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };





    if (!room) return <p>Loading...</p>;

    return (
        <div className="room-detail">
            <img src={room.image} alt={room.name} className="w-full h-64 object-contain" />
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p>{room.description}</p>
            <p>Price: ${room.price} / night</p>
            <p>Rating: ⭐ {room.rating}</p>
            <p>Room ID: {room.id}</p>
            <p>{room.availability ? 'Available' : 'Unavailable'}</p>

            {room.availability && (
                <button
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                    className="bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                >
                    Book Now
                </button>
            )}
            {!room.availability && <p>This room is currently unavailable for booking.</p>}

            {/* Review Section */}
            <div className="reviews">
                <h2 className="text-2xl font-bold mt-6">Reviews:</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="review-item mt-4">
                            <div className="flex">
                                <div>
                                    <img className="w-20 h-20" src={img} alt="" />
                                </div>
                                <div>
                                    <p>
                                        <strong>{review.reviewer}</strong>
                                    </p>
                                    <p>{review.reviewText}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Booking Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <img src={room.image} alt={room.name} className="w-full h-64 object-contain" />
                    <h1 className="text-3xl font-bold">{room.name}</h1>
                    <p>{room.description}</p>
                    <p>Price: ${room.price} / night</p>

                    <div className="mt-4">
                        <h3 className="font-semibold">Select Booking Dates:</h3>
                        <div className="mb-4">
                            <label className="block font-semibold">Check-In:</label>
                            <input
                                type="text"
                                value={checkInDate ? checkInDate.toISOString().split('T')[0] : ''}
                                onClick={() => setCheckInOpen(true)}
                                readOnly
                                className="border px-3 py-2 w-full cursor-pointer"
                                placeholder="Select Check-In Date"
                            />
                            {isCheckInOpen && (
                                <Calendar
                                    value={checkInDate}
                                    onChange={(date) => {
                                        setCheckInDate(date);
                                        setCheckInOpen(false);
                                    }}
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Check-Out:</label>
                            <input
                                type="text"
                                value={checkOutDate ? checkOutDate.toISOString().split('T')[0] : ''}
                                onClick={() => setCheckOutOpen(true)}
                                readOnly
                                className="border px-3 py-2 w-full cursor-pointer"
                                placeholder="Select Check-Out Date"
                            />
                            {isCheckOutOpen && (
                                <Calendar
                                    value={checkOutDate}
                                    onChange={(date) => {
                                        setCheckOutDate(date);
                                        setCheckOutOpen(false);
                                    }}
                                    minDate={checkInDate || new Date()}
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Single Booking Date:</label>
                            <input
                                type="date"
                                value={bookingDate ? bookingDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setBookingDate(new Date(e.target.value))}
                                className="border px-3 py-2 w-full cursor-pointer"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn bg-[#DDA15E] text-[#3F0113] hover:bg-[#3F0113] hover:text-[#BC6C25]" onClick={handleBooking}>
                            Confirm Booking
                        </button>
                        <form method="dialog">
                            <button className="btn bg-[#DDA15E] text-[#3F0113] hover:bg-[#3F0113] hover:text-[#BC6C25]">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RoomDetail;
