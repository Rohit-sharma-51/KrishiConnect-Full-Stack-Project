import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import FarmerDashboard from './FarmerDashboard';
import BuyerDashboard from './BuyerDashboard';

  const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Dashboard useEffect - Token:', token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }
      
      const response = await axios.post('http://localhost:8000/api/userData', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User data response:', response.data);
      setUser(response.data.object);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        console.log('Token is invalid, redirecting to login');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to fetch user data');
      }
      setLoading(false);
    }
  };

    if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user type
  if (user?.userType === 'farmer') {
    return <FarmerDashboard />;
  } else if (user?.userType === 'buyer') {
    return <BuyerDashboard />;
  } else {
    // Fallback for unknown user types
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unknown User Type</h2>
          <p className="text-gray-600 mb-4">Please contact support to resolve this issue.</p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
};

export default Dashboard;  