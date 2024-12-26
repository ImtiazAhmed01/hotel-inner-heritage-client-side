import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RoomDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [room, setRoom] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [isCheckInOpen, setCheckInOpen] = useState(false);
    const [isCheckOutOpen, setCheckOutOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${id}`)
            .then(res => res.json())
            .then(data => setRoom(data))
            .catch(error => console.error("Error fetching room details:", error));
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            alert("You need to be logged in to book a room.");
            navigate("/login");
            return;
        }

        if (!room.availability) {
            alert("This room is currently unavailable.");
            return;
        }

        if (!checkInDate || !checkOutDate) {
            alert("Please select both check-in and check-out dates.");
            return;
        }

        fetch(`http://localhost:5000/rooms/${id}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkInDate: checkInDate.toISOString().split('T')[0],
                checkOutDate: checkOutDate.toISOString().split('T')[0],
                userId: user.id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message || "Room booked successfully!");
                setRoom(prev => ({ ...prev, availability: false }));
                document.getElementById('my_modal_5').close();
            })
            .catch(error => console.error("Error booking room:", error));
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
            <p>{room.availability ? "Available" : "Unavailable"}</p>

            {user && (
                <div className="reviews">
                    <h2 className="text-xl font-semibold mt-6">Reviews:</h2>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review, index) => (
                                <li key={index} className="border p-2 my-2">
                                    <strong>{review.user}</strong> (⭐ {review.rating}): {review.comment}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available for this room.</p>
                    )}
                </div>
            )}

            {room.availability && (
                <button
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                    className="bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                >
                    Book Now
                </button>
            )}
            {!room.availability && <p>This room is currently unavailable for booking.</p>}

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
                                    onChange={date => {
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
                                    onChange={date => {
                                        setCheckOutDate(date);
                                        setCheckOutOpen(false);
                                    }}
                                    minDate={checkInDate || new Date()}
                                />
                            )}
                        </div>
                    </div>

                    <div className="modal-action">
                        <button className="btn bg-green-500 text-white" onClick={handleBooking}>
                            Confirm Booking
                        </button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RoomDetail;
