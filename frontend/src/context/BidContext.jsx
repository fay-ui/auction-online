import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create BidContext
const BidContext = createContext();

// Custom hook to use BidContext
export const useBids = () => {
    const context = useContext(BidContext);
    if (!context) {
        throw new Error("useBids must be used within a BidProvider");
    }
    return context;
};

// BidProvider component
export const BidProvider = ({ children }) => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Place a bid
    const placeBid = async (itemId, bidAmount) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/item/${itemId}/bids`, { bidAmount });
            setBids((prevBids) => [...prevBids, response.data]);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Withdraw a bid
    const withdrawBid = async (bidId) => {
        try {
            await axios.delete(`/bids/${bidId}`);
            setBids((prevBids) => prevBids.filter((bid) => bid.bid_id !== bidId));
        } catch (err) {
            throw err;
        }
    };

    return (
        <BidContext.Provider
            value={{
                bids,
                loading,
                error,
                placeBid,
                withdrawBid,
            }}
        >
            {children}
        </BidContext.Provider>
    );
};