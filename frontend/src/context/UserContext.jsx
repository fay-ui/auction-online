import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create UserContext
export const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// Detect if localStorage is available
const isStorageAvailable = (() => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('__test__', 'test');
            localStorage.removeItem('__test__');
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
})();

const storage = isStorageAvailable ? localStorage : sessionStorage; // Fallback to sessionStorage if localStorage is not available

// UserProvider component
export const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    // Initialize state based on storage values (user and token)
    const storedUser = storage.getItem('user');
    const storedToken = storage.getItem('token');

    const initialUserState = storedUser ? JSON.parse(storedUser) : null;
    const initialAuthState = storedToken && storedUser ? true : false;

    const [user, setUser] = useState(initialUserState);
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
    const [successMessage, setSuccessMessage] = useState(''); // Success message state

    // Check storage for user data on mount
    useEffect(() => {
        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser?.user_id) {
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    throw new Error("Invalid user data");
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                storage.removeItem('user');
                storage.removeItem('token');
            }
        }
    }, []);

    // Clear user data and reset authentication state
    const clearUserData = () => {
        setUser(null);
        setIsAuthenticated(false);
        storage.removeItem('user');
        storage.removeItem('token');
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            console.log("Register Request Data:", { name, email, password });

            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const textResponse = await response.text();
            console.log("Raw Server Response:", textResponse);

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}: ${textResponse}`);
            }

            const data = JSON.parse(textResponse);
            console.log("Parsed Response Data:", data);

            if (!data.access_token) {
                throw new Error('Registration failed: No access token');
            }

            const userResponse = await fetch('http://localhost:5000/current_user', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.access_token}`
                }
            });

            const userData = await userResponse.json();
            console.log("User Data:", userData);

            if (!userData.user_id) {
                throw new Error('Invalid user data');
            }

            storage.setItem('user', JSON.stringify(userData));
            storage.setItem('token', data.access_token);

            setUser(userData);
            setIsAuthenticated(true);
            return true; // Registration successful
        } catch (error) {
            console.error('Registration failed:', error);
            alert(error.message || 'Registration failed. Please try again.');
            return false;
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const textResponse = await response.text();
            const data = JSON.parse(textResponse);
            console.log("Login Raw Server Response:", textResponse);

            if (!data.access_token) {
                throw new Error('Invalid response from server');
            }

            const userResponse = await fetch('http://localhost:5000/current_user', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.access_token}`
                }
            });

            const userData = await userResponse.json();
            if (!userData.user_id) throw new Error('Invalid user data');

            storage.setItem('user', JSON.stringify(userData));
            storage.setItem('token', data.access_token);

            setUser(userData);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            alert(error.message || 'Login failed. Please check your credentials.');
            return false;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            const token = storage.getItem('token');
            if (!token) {
                clearUserData();
                setSuccessMessage('You have logged out successfully');
                setTimeout(() => setSuccessMessage(''), 3000);  // Hide message after 3 seconds
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:5000/logout', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Logout failed');

            clearUserData();
            setSuccessMessage('You have logged out successfully');
            setTimeout(() => setSuccessMessage(''), 3000);  // Hide message after 3 seconds
            navigate('/login');
            return true;
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
            return false;
        }
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}

            {/* Success Message UI */}
            {successMessage && (
                <div style={{
                    position: 'fixed', 
                    bottom: '20px', 
                    left: '20px', 
                    padding: '10px', 
                    backgroundColor: 'green', 
                    color: 'white', 
                    borderRadius: '5px',
                    zIndex: 999
                }}>
                    {successMessage}
                </div>
            )}
        </UserContext.Provider>
    );
};
