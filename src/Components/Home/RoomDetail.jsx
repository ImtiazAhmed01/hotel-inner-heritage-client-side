import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Modal, Button } from 'daisyui';

const RoomDetail = () => {
    const { id } = useParams(); // Get room id from URL parameters
    const [room, setRoom] = useState(null);
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch room details
    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${id}`)
            .then(res => res.json())
            .then(data => setRoom(data))
            .catch(error => console.error("Error fetching room details:", error));

        // Fetch reviews for the specific room (using roomId)
        fetch(`http://localhost:5000/rooms/${parseInt(id, 10)}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews:", error));
        fetch(`http://localhost:5000/rooms/${id}/reviews`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Fetched reviews:", data); // Debugging log
                setReviews(data);
            })
            .catch(error => console.error("Error fetching reviews:", error));
    }, [id]); // Dependencies array ensures it runs when the `id` changes

    const handleBooking = () => {
        fetch(`http://localhost:5000/rooms/${id}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                setRoom(prev => ({ ...prev, availability: false }));
                setModalOpen(false);
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

            {room.availability && (
                <button onClick={() => setModalOpen(true)} className="bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]">
                    Book Now
                </button>
            )}

            {isModalOpen && (
                <Modal open={isModalOpen} onClickBackdrop={() => setModalOpen(false)}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold">Booking Summary</h2>
                        <p><strong>Room:</strong> {room.name}</p>
                        <p><strong>Price:</strong> ${room.price}</p>
                        <p><strong>Date:</strong> {format(selectedDate, 'yyyy-MM-dd')}</p>
                        <input
                            type="date"
                            className="mt-4 border p-2"
                            value={format(selectedDate, 'yyyy-MM-dd')}
                            onChange={e => setSelectedDate(new Date(e.target.value))}
                        />
                        <div className="mt-6 flex justify-end gap-4">
                            <Button color="secondary" onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleBooking}>
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default RoomDetail;
