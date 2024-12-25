import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${id}`) // Replace with your API URL
            .then(res => res.json())
            .then(data => setRoom(data))
            .catch(error => console.error("Error fetching room details:", error));
    }, [id]);

    if (!room) return <p>Loading...</p>;

    return (
        <div className="room-detail">
            <img src={room.image} alt={room.title} className="w-full h-64 object-cover" />
            <h1 className="text-3xl font-bold">{room.title}</h1>
            <p>{room.description}</p>
            <p>Price: ${room.price} / night</p>
            <p>Rating: ⭐ {room.rating}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Confirm Booking
            </button>
        </div>
    );
};

export default RoomDetail;
