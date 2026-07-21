import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeart,
  FaTrash,
  FaEdit,
  FaEnvelope,
  FaStar,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const Wishlist = ({ user }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlist(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setLoading(false);
    }
  };

  const addToWishlist = async (productId, notes = '', priority = 'medium') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/wishlist/add', {
        productId,
        notes,
        priority
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Product added to wishlist');
      fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const updateWishlistItem = async (itemId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8000/api/wishlist/${itemId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlist(prev => 
        prev.map(item => 
          item._id === itemId ? { ...item, ...updates } : item
        )
      );
      setEditingItem(null);
      toast.success('Wishlist item updated');
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      toast.error('Failed to update wishlist item');
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/wishlist/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setWishlist(prev => prev.filter(item => item._id !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const sendContactRequest = async (wishlistItem) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/wishlist/${wishlistItem._id}/contact`, {
        message: contactMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Contact request sent successfully');
      setContactModal(null);
      setContactMessage('');
      fetchWishlist(); // Refresh to update contactRequested status
    } catch (error) {
      console.error('Error sending contact request:', error);
      toast.error('Failed to send contact request');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <FaStar className="text-red-500" />;
      case 'medium':
        return <FaStar className="text-yellow-500" />;
      case 'low':
        return <FaStar className="text-green-500" />;
      default:
        return <FaStar className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"> 
         <div className="flex items-center space-x-2"> 
      {/* <h1>Header</h1> */}
           <FaHeart className="text-2xl text-red-500" /> 
           <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2> 
           <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
            {wishlist.length} items
          </span> 
         </div> 
    </div> 
    

       {/* Wishlist Items */}
       <AnimatePresence>
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <FaHeart className="text-6xl mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500">Start adding products you're interested in!</p> 
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200 relative">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaHeart className="text-4xl" />
                    </div>
                  )}
                  
                  {/* Priority Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product?.name || 'Product Name'}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(item.priority)}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-2">
                    ₹{item.product?.price || 0} per {item.product?.unit || 'unit'}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaUser className="mr-1" />
                    <span>{item.product?.farmer?.fullName || 'Farmer Name'}</span>
                  </div>

                  {/* Notes */}
                  {item.notes && (
                    <div className="mb-3 p-2 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">{item.notes}</p>
                    </div>
                  )}

                  {/* Contact Status */}
                  {item.contactRequested && (
                    <div className="mb-3 p-2 bg-blue-50 rounded">
                      <div className="flex items-center text-sm text-blue-600">
                        <FaEnvelope className="mr-1" />
                        <span>Contact request sent</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-1">
                        {new Date(item.contactRequestDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {!item.contactRequested ? (
                      <button
                        onClick={() => setContactModal(item)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FaEnvelope className="mr-1" />
                        Contact Farmer
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 px-3 py-2 rounded text-sm cursor-not-allowed"
                      >
                        <FaCheck className="mr-1" />
                        Contact Sent
                      </button>
                    )}

                    <button
                      onClick={() => setEditingItem(item)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Wishlist Item</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={editingItem.notes}
                  onChange={(e) => setEditingItem({...editingItem, notes: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Add notes about this product..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={editingItem.priority}
                  onChange={(e) => setEditingItem({...editingItem, priority: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => updateWishlistItem(editingItem._id, {
                  notes: editingItem.notes,
                  priority: editingItem.priority
                })}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Contact Farmer</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Send a message to {contactModal.product?.farmer?.fullName} about {contactModal.product?.name}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Hi, I'm interested in your product..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => sendContactRequest(contactModal)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={!contactMessage.trim()}
              >
                Send Message
              </button>
              <button
                onClick={() => {
                  setContactModal(null);
                  setContactMessage('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist; 