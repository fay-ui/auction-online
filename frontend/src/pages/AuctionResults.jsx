import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuctionResults = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('/item');
                const closedItems = response.data.filter((item) => item.status === 'closed');
                setItems(closedItems);
            } catch (err) {
                setError('Failed to fetch auction results.');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Auction Results</h1>
            <div className="row">
                {items.map((item) => (
                    <div key={item.item_id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p><strong>Final Price:</strong> ${item.current_price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionResults;