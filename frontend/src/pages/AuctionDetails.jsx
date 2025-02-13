
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuctionDetails = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`/item/${itemId}`);
                setItem(response.data);
            } catch (err) {
                setError('Failed to fetch auction details.');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{item.title}</h1>
            <div className="card p-4">
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Starting Price:</strong> ${item.starting_price}</p>
                <p><strong>Current Price:</strong> ${item.current_price}</p>
                <p><strong>Auction End Time:</strong> {new Date(item.auction_end_time).toLocaleString()}</p>
                <p><strong>Status:</strong> {item.status}</p>
            </div>
        </div>
    );
};

export default AuctionDetails;