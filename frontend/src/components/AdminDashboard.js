import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.map((user, index) => (
        <div key={index}>
          <h3>{user.name}</h3>
          <p>{user.socialMediaHandle}</p>
          {user.images.map((img, idx) => (
            <img key={idx} src={`http://localhost:5000/uploads/${img}`} alt="User Upload" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
