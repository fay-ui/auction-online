import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useUser(); // Access the authentication status

    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    return element; // If authenticated, render the element (protected route)
};

export default ProtectedRoute;
