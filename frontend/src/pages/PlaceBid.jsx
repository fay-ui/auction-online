
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlaceBid = () => {
    const { itemId } = useParams();
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/item/${itemId}/bids`, { bidAmount });
            if (response.data.bid_id) {
                setSuccess('Bid placed successfully!');
                setError('');
            }
        } catch (err) {
            setError('Failed to place bid. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Place a Bid</h1>
            <div className="card p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="bidAmount" className="form-label">Bid Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="bidAmount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Place Bid</button>
                </form>
            </div>
        </div>
    );
};

export default PlaceBid;
