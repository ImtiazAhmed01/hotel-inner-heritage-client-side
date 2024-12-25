import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/featured-rooms') // Replace with your API URL
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(error => console.error("Error fetching rooms:", error));
    }, []);

    const handleBookNow = (id) => {
        navigate(`/room/${id}`);
    };

    return (
        <div className="featured-rooms">
            <h1 className="font-bold text-2xl mb-4 text-center">Featured Rooms</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:px-32 px-10">
                {rooms.map(room => (
                    <div key={room._id} className="room-card bg-[#FEFAE0] p-4 shadow-md rounded-md">
                        <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="font-semibold text-lg mt-2">{room.name}</h2>
                        <p className="text-gray-500">{room.description}</p>
                        <p className="text-green-600 font-bold">Price: ${room.price} / night</p>
                        <p className="text-yellow-500">Rating: ⭐ {room.rating}</p>
                        <button
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={() => handleBookNow(room._id)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRooms;
