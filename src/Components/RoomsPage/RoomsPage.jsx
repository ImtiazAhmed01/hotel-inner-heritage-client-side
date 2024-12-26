import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const navigate = useNavigate();

    const fetchRooms = () => {
        const query = new URLSearchParams();
        if (minPrice) query.append('minPrice', minPrice);
        if (maxPrice) query.append('maxPrice', maxPrice);

        fetch(`http://localhost:5000/rooms?${query.toString()}`)
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    };

    useEffect(() => {
        // Fetch all rooms on initial load
        fetchRooms();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        fetchRooms();
    };

    const handleCardClick = (id) => {
        navigate(`/room/${id}`); // Redirect to room details page
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

            {/* Filter */}
            <form className="mb-6 flex gap-4" onSubmit={handleFilter}>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border rounded p-2"
                />
                <button
                    type="submit"
                    className="bg-[#DDA15E] text-[#3F0113] px-4 py-2 rounded btn hover:bg-[#3F0113] hover:text-[#BC6C25]"
                >
                    Filter
                </button>
            </form>

            {/* Rooms Grid */}
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
