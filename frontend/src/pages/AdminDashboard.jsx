import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchUsers();
            fetchItems();
        }
    }, [user]);

    const fetchUsers = async () => {
        const response = await axios.get('/user');
        setUsers(response.data);
    };

    const fetchItems = async () => {
        const response = await axios.get('/item');
        setItems(response.data);
    };

    const promoteUser = async (userId) => {
        await axios.post(`/api/user/promote/${userId}`);
        fetchUsers();
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map(u => (
                    <li key={u.user_id}>
                        {u.name} - {u.role}
                        {u.role !== 'admin' && <button onClick={() => promoteUser(u.user_id)}>Promote to Admin</button>}
                    </li>
                ))}
            </ul>
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item.item_id}>
                        {item.title} - {item.status}
                        <Link to={`/item/${item.item_id}`}>View</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;