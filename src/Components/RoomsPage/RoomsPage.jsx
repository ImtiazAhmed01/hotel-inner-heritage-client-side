import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all rooms from the backend
        fetch('http://localhost:5000/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/room/${id}`); // Redirect to room details page
    };

    return (
        <div className="p-8 ">
            <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {rooms.map((room) => (
                    <div
                        key={room._id}
                        className="border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition bg-[#FEFAE0]"
                        onClick={() => handleCardClick(room._id)}
                    >
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{room.name}</h2>
                            <p className="text-gray-600">Price: ${room.price} / night</p>
                            <p className="text-gray-600">Rating: ⭐ {room.rating || 'N/A'}</p>
                            <p className="text-gray-600">Reviews: {room.reviewCount || 0}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomsPage;
