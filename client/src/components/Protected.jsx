import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    const isAuthenticated = () => {
      return localStorage.getItem('token') !== null;
    };

    if (!isAuthenticated()) {
      navigate('/');
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>User Dashboard</h1>
      <p>Welcome to user dashboard</p><br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Protected;





