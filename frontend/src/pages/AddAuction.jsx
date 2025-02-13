import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAuction = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [auctionEndTime, setAuctionEndTime] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/item', {
                title,
                description,
                starting_price: startingPrice,
                auction_end_time: auctionEndTime,
            }, {
                withCredentials: true,  // Required for cookies/authentication
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
    
            if (response.data.item_id) {
                navigate('/auction-listing');
            }
        } catch (err) {
            setError('Failed to create auction. Please try again.');
            console.error("Axios error:", err);
        }
    };
    
    
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add New Auction</h1>
            <div className="card p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startingPrice" className="form-label">Starting Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="startingPrice"
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="auctionEndTime" className="form-label">Auction End Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="auctionEndTime"
                            value={auctionEndTime}
                            onChange={(e) => setAuctionEndTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Auction</button>
                </form>
            </div>
        </div>
    );
};

export default AddAuction;