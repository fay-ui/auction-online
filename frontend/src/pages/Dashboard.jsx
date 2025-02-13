import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useUser();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('/item');
            console.log("API Response:", response.data); // Log the response
            if (Array.isArray(response.data)) {
                setItems(response.data);
            } else {
                console.error("Expected an array of items, but received:", response.data);
                setItems([]); // Set items to an empty array to avoid runtime errors
            }
        } catch (error) {
            console.error("Error fetching items:", error);
            setItems([]); // Set items to an empty array in case of an error
        }
    };

    const placeBid = async (itemId, bidAmount) => {
        await axios.post(`/item/${itemId}/bid`, { bidAmount });
        fetchItems();
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Available Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item.item_id}>
                        {item.title} - Current Price: {item.current_price}
                        <button onClick={() => placeBid(item.item_id, item.current_price + 10)}>Bid</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;