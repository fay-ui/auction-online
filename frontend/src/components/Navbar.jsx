import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import useUser hook

// Navbar component
export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useUser(); // Get user and logout function

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img className="auction-logo" src="/logo/" alt="Logo" />   
                <Link to="/" className="navbar-brand">AUCTIGON</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>

                        {isAuthenticated && user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <li className="nav-item">
                                        <Link to="/admindashboard" className="nav-link">Admin Dashboard</Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/addauction" className="nav-link">Add Item</Link>
                                </li>

                                <li className="nav-item">
                                    <button 
                                        className="btn btn-danger btn-sm ms-3" 
                                        onClick={async () => {
                                            const success = await logout();
                                            if (success) {
                                                navigate('/login'); // Ensure navigation happens after logout
                                            }
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}