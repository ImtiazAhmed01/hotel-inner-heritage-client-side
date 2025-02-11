import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchRooms = () => {
        setLoading(true);
        const query = new URLSearchParams();
        if (minPrice) query.append('minPrice', minPrice);
        if (maxPrice) query.append('maxPrice', maxPrice);

        fetch(`https://hotel-inner-heritage-server.vercel.app/rooms?${query.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                let sortedData = [...data];
                if (sortOrder === 'asc') {
                    sortedData.sort((a, b) => a.price - b.price);
                } else if (sortOrder === 'desc') {
                    sortedData.sort((a, b) => b.price - a.price);
                }
                setRooms(sortedData);
            })
            .catch((error) => console.error("Error fetching rooms:", error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchRooms();
    }, [sortOrder]);

    const handleFilter = (e) => {
        e.preventDefault();
        fetchRooms();
    };

    const handleCardClick = (id) => {
        navigate(`/room/${id}`);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

            {/* Filter & Sorting Controls */}
            <form className="mb-6 flex flex-wrap gap-4" onSubmit={handleFilter}>
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

            {/* Sort Buttons */}
            <div className="mb-6 flex gap-4">
                <button
                    onClick={() => setSortOrder('asc')}
                    className={`btn ${sortOrder === 'asc' ? 'bg-[#3F0113] text-[#BC6C25]' : 'bg-[#DDA15E] text-[#3F0113]'}`}
                >
                    Sort by Price: Low to High
                </button>
                <button
                    onClick={() => setSortOrder('desc')}
                    className={`btn ${sortOrder === 'desc' ? 'bg-[#3F0113] text-[#BC6C25]' : 'bg-[#DDA15E] text-[#3F0113]'}`}
                >
                    Sort by Price: High to Low
                </button>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <ClipLoader size={50} color="#DDA15E" />
                </div>
            ) : (
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
                                <p className="text-gray-600">Reviews: {room.reviewsCount || 0}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomsPage;
