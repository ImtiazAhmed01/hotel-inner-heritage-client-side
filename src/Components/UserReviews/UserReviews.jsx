import React, { useEffect, useState } from 'react';

const UserReviews = ({ roomId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${roomId}/reviews`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, [roomId]);

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        <p><strong>{review.user}</strong></p>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                        <p><em>{new Date(review.timestamp).toLocaleDateString()}</em></p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this room.</p>
            )}
        </div>
    );
};

export default UserReviews;
