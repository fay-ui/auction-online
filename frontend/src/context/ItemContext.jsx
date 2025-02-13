import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create ItemContext
const ItemContext = createContext();

// Custom hook to use ItemContext
export const useItems = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error("useItems must be used within an ItemProvider");
    }
    return context;
};

// ItemProvider component
export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all items
    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/item'); // ✅ Fixed URL
            setItems(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new item
    const createItem = async (itemData) => {
        try {
            const response = await axios.post('http://localhost:5000/item', itemData);
            setItems((prevItems) => [...prevItems, response.data]);
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    // Update an item
    const updateItem = async (itemId, updatedData) => {
        try {
            const response = await axios.patch(`http://localhost:5000/item/${itemId}`, updatedData); // ✅ Fixed extra `'`
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.item_id === itemId ? response.data : item
                )
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    // Delete an item
    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/item/${itemId}`);
            setItems((prevItems) =>
                prevItems.filter((item) => item.item_id !== itemId)
            );
        } catch (err) {
            throw err;
        }
    };

    // Fetch items on mount
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <ItemContext.Provider
            value={{
                items,
                loading,
                error,
                fetchItems,
                createItem,
                updateItem,
                deleteItem,
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};