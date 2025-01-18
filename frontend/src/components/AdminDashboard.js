import React, { useEffect, useState } from 'react';
import { Loader2, Search, RefreshCw, ExternalLink, Trash2 } from 'lucide-react';
import '../App.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log(data);
      setUsers(data.data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      
      // Remove user from state
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.socialMediaHandle.toLowerCase().includes(searchTerm.toLowerCase())
  );
 return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <button onClick={fetchUsers} className="refresh-button">
            <RefreshCw className="refresh-icon" />
            Refresh
          </button>
        </div>
        
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="card-content">
                <div className="user-header">
                  <div className="user-info">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-handle">{user.socialMediaHandle}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={isDeleting}
                    className="delete-button"
                  >
                    <Trash2 className="delete-icon" />
                  </button>
                </div>
                
                <div className="images-grid">
                  {user.images.map((img, idx) => (
                    <div key={idx} className="image-container">
                      <img
                       src={`${process.env.REACT_APP_API_URL}/uploads/${img}`}
                       
                        alt={`Upload by ${user.name}`}
                        className="user-image"
                      />
                      <a
                        href={`${process.env.REACT_APP_API_URL}/uploads/${img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="image-overlay"
                      >
                        <ExternalLink className="external-icon" />
                      </a>
                    </div>
                  ))}
                </div>
                
                {user.submissionDate && (
                  <p className="submission-date">
                    Submitted on: {new Date(user.submissionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="no-results">
              No users found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;