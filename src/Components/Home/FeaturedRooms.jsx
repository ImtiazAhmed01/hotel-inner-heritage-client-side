import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://hotel-inner-heritage-server.vercel.app/featured-rooms') // Replace with your API URL
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(error => console.error("Error fetching rooms:", error));
    }, []);

    const handleBookNow = (id) => {
        navigate(`/room/${id}`);
    };
    const handleCardClick = (id) => {
        navigate(`/room/${id}`);
    };
    const handleMore = () => {
        navigate("roomspage");
    };

    return (
        <div className="featured-rooms">
            <h1 className="font-bold text-2xl mb-4 text-center ">Featured Rooms</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-32 px-10">
                {rooms.map(room => (
                    <div key={room._id} className="room-card bg-[#FEFAE0] p-4 shadow-md rounded-md">
                        <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="font-semibold text-lg mt-2 text-[#3F0113]">{room.name}</h2>
                        <p className="text-gray-500">{room.description}</p>
                        <p className="text-green-600 font-bold">Price: ${room.price} / night</p>
                        <p className="text-yellow-500">Rating: ⭐ {room.rating}</p>
                        <div className='flex justify-between'>
                            <button
                                className="bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                                onClick={() => handleBookNow(room._id)}
                            >
                                Book Now
                            </button>
                            <button
                                className=" bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                                onClick={() => handleCardClick(room._id)}
                            >
                                Details
                            </button>
                        </div>

                    </div>
                ))}

            </div>
            <div className='text-center'>
                <button
                    className="bg-[#DDA15E] text-[#3F0113] mt-4 px-6 py-2 btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                    onClick={() => handleMore()}
                >
                    See more
                </button>
            </div>
        </div>
    );
};

export default FeaturedRooms;
