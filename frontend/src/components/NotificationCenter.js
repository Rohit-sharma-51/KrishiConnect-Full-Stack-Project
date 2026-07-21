import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBell,
  FaCheck,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaTrash
} from 'react-icons/fa';

const NotificationCenter = ({ user, onNotificationUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle both array and object response formats
      const notificationsData = Array.isArray(response.data) ? response.data : response.data.notifications || [];
      
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter(n => !n.isRead).length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(prev => 
        prev.map(n => 
          n._id === notificationId ? { ...n, isRead: true, status: 'read' } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleApproveRequest = async (notification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/approve-request', {
        notificationId: notification._id,
        action: 'approve'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Request approved successfully!');
      markAsRead(notification._id);
      if (onNotificationUpdate) onNotificationUpdate();
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    }
  };

  const handleRejectRequest = async (notification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/approve-request', {
        notificationId: notification._id,
        action: 'reject'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Request rejected');
      markAsRead(notification._id);
      if (onNotificationUpdate) onNotificationUpdate();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'buy_request':
        return <FaShoppingCart className="text-blue-500" />;
      case 'contact_request':
        return <FaEnvelope className="text-green-500" />;
      case 'approval':
        return <FaCheckCircle className="text-green-600" />;
      case 'rejection':
        return <FaTimes className="text-red-500" />;
      case 'payment_received':
        return <FaCheck className="text-green-600" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'buy_request':
        return 'border-l-blue-500 bg-blue-50';
      case 'contact_request':
        return 'border-l-green-500 bg-green-50';
      case 'approval':
        return 'border-l-green-600 bg-green-50';
      case 'rejection':
        return 'border-l-red-500 bg-red-50';
      case 'payment_received':
        return 'border-l-green-600 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const displayedNotifications = showAll ? notifications : (Array.isArray(notifications) ? notifications.slice(0, 5) : []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <FaBell className="text-xl text-gray-600" />
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {displayedNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center text-gray-500"
            >
              <FaBell className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No notifications yet</p>
            </motion.div>
                      ) : (
              (Array.isArray(displayedNotifications) ? displayedNotifications : []).map((notification) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                  !notification.isRead ? 'bg-white' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    
                    {/* Action Buttons for Farmers */}
                    {user?.userType === 'farmer' && notification.type === 'buy_request' && !notification.isRead && (
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => handleApproveRequest(notification)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectRequest(notification)}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    
                    {/* Action Buttons for Buyers */}
                    {user?.userType === 'buyer' && notification.type === 'approval' && notification.actionRequired && (
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            // Navigate to payment page
                            toast.success('Redirecting to payment...');
                            markAsRead(notification._id);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Proceed to Payment
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="text-gray-400 hover:text-gray-600"
                      title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {notification.isRead ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      {Array.isArray(notifications) && notifications.length > 5 && (
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
          >
            {showAll ? 'Show Less' : `Show ${notifications.length - 5} More`}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 