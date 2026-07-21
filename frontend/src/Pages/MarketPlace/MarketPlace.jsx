
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const categories = ['all', 'grains', 'vegetables', 'fruits', 'pulses', 'spices', 'dairy'];
  const locations = ['all', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Handle location filtering for both string and object locations
    let productLocation = '';
    if (typeof product.location === 'string') {
      productLocation = product.location;
    } else if (product.location?.city && product.location?.state) {
      productLocation = `${product.location.city}, ${product.location.state}`;
    }
    
    const matchesLocation = selectedLocation === 'all' || productLocation.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const [buyModal, setBuyModal] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [buyMessage, setBuyMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleBuyRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/buy-request', {
        productId: buyModal._id,
        quantity: buyQuantity,
        message: buyMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Buy request sent successfully!');
      setBuyModal(null);
      setBuyQuantity(1);
      setBuyMessage('');
    } catch (error) {
      console.error('Error sending buy request:', error);
      toast.error('Failed to send buy request');
    }
  };

  const handleContactRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/contact-request', {
        productId: contactModal._id,
        message: contactMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Contact request sent successfully!');
      setContactModal(null);
      setContactMessage('');
    } catch (error) {
      console.error('Error sending contact request:', error);
      toast.error('Failed to send contact request');
    }
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        {/* <img 
          src={product.images && product.images.length > 0 ? product.images[0] : '/Crops/Rice.jpg'} 
          alt={product.name || 'Product'}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/Crops/Rice.jpg';
          }} */}
        {/* /> */}
        <div className="absolute top-2 right-2">
           <span className={`px-2 py-1 rounded-full text-xs font-semibold 
            // product.isAvailable !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}> 
            {/* {product.isAvailable !== false ? 'Available' : 'Out of Stock'} */}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name || 'Unnamed Product'}</h3>
          <span className="text-sm text-gray-500 capitalize">{product.category || 'General'}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description || 'No description available'}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-green-600 font-semibold">
            <span className="mr-1">₹</span>
            {product.price || 0} / {product.unit || 'kg'}
          </div>
          <div className="text-sm text-gray-500">
            Qty: {product.quantity || 0} {product.unit || 'kg'}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            {typeof product.location === 'string' ? product.location : 
            //  product.location?.city ? `${product.location.city}, ${product.location.state}` : 
            //  'Location not specified'
           <p>Jewar, Uttar Pradesh</p> 
            }
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            {product.harvestDate ? new Date(product.harvestDate).toLocaleDateString() : 'Date not specified'}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            By:Rohit Sharma 
          </div>
          {/* {product.farmerName || product.farmerId?.fullName || 'Farmer'} */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setBuyModal(product)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Buy Now
            </button>
            <button 
              onClick={() => setContactModal(product)}
              className="bg-gradient-to-r from-[#219653] to-[#6fcf97] hover:from-[#27ae60] hover:to-[#219653] text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#219653] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#219653] mb-2">Marketplace</h1>
          <p className="text-gray-600 text-lg">Discover fresh produce directly from farmers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#219653] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#219653] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#219653] focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#219653]">{products.length}</div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#219653]">
                {products.filter(p => p.isAvailable).length}
              </div>
              <div className="text-gray-600">Available Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#219653]">
                {new Set(products.map(p => {
                  if (typeof p.location === 'string') return p.location;
                  if (p.location?.city && p.location?.state) return `${p.location.city}, ${p.location.state}`;
                  return 'Unknown';
                })).size}
              </div>
              <div className="text-gray-600">Active Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {buyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Buy Request</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{buyModal.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Price: ₹{buyModal.price} per {buyModal.unit || 'unit'}
              </p>
              <p className="text-sm text-gray-600">
                Available: {buyModal.quantity} {buyModal.unit || 'units'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={buyModal.quantity}
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Farmer (Optional)
                </label>
                <textarea
                  value={buyMessage}
                  onChange={(e) => setBuyMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Any special requirements or questions..."
                />
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">
                  Total Amount: ₹{buyModal.price * buyQuantity}
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleBuyRequest}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send Buy Request
              </button>
              <button
                onClick={() => {
                  setBuyModal(null);
                  setBuyQuantity(1);
                  setBuyMessage('');
                }}
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
              <h4 className="font-medium text-gray-900 mb-2">{contactModal.name}</h4>
              <p className="text-sm text-gray-600">
                Send a message to the farmer about this product
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
                onClick={handleContactRequest}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
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

export default MarketPlace;
