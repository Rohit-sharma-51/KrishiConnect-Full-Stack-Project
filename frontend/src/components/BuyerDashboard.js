import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FaUser, FaShoppingCart, FaChartLine, FaBell, FaCog, FaSignOutAlt,
  FaPlus, FaSearch, FaFilter, FaLanguage, FaWallet, FaBox, FaStore,
  FaHeart, FaStar, FaTruck, FaCreditCard
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import NotificationCenter from './NotificationCenter';
import Wishlist from './Wishlist';
import AIInsights from './AIInsights';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Configure axios base URL
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [contactMessage, setContactMessage] = useState('');

  const translations = {
    english: {
      overview: 'Buying Overview',
      marketplace: 'Browse Products',
      analytics: 'Purchase Analytics',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
      welcome: 'Welcome back, Buyer',
      totalSpent: 'Total Spent',
      totalOrders: 'Orders Placed',
      favoriteProducts: 'Favorite Products',
      averageOrder: 'Average Order Value',
      marketTrends: 'Price Trends',
      recentOrders: 'Recent Orders',
      wishlist: 'Wishlist',
      bestDeals: 'Best Deals',
      addToWishlist: 'Add to Wishlist',
      searchProducts: 'Search Products',
      filter: 'Filter',
      language: 'Language',
      priceAlerts: 'Price Alerts',
      deliveryTracking: 'Delivery Tracking',
      paymentHistory: 'Payment History',
      reviews: 'Reviews'
    },
    hindi: {
      overview: 'खरीदारी अवलोकन',
      marketplace: 'उत्पाद ब्राउज़ करें',
      analytics: 'खरीदारी विश्लेषण',
      notifications: 'सूचनाएं',
      profile: 'प्रोफ़ाइल',
      logout: 'लॉगआउट',
      welcome: 'वापसी पर स्वागत है, खरीदार',
      totalSpent: 'कुल खर्च',
      totalOrders: 'किए गए आदेश',
      favoriteProducts: 'पसंदीदा उत्पाद',
      averageOrder: 'औसत आदेश मूल्य',
      marketTrends: 'मूल्य रुझान',
      recentOrders: 'हाल के आदेश',
      wishlist: 'इच्छा सूची',
      bestDeals: 'सर्वोत्तम सौदे',
      addToWishlist: 'इच्छा सूची में जोड़ें',
      searchProducts: 'उत्पाद खोजें',
      filter: 'फ़िल्टर',
      language: 'भाषा',
      priceAlerts: 'मूल्य अलर्ट',
      deliveryTracking: 'डिलीवरी ट्रैकिंग',
      paymentHistory: 'भुगतान इतिहास',
      reviews: 'समीक्षाएं'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('BuyerDashboard useEffect - Token:', token);

    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    fetchUserData();
    fetchAnalytics();
    fetchMarketData();
    fetchNotifications();
    fetchProducts();
    fetchOrders();
    fetchWishlist();
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
      setLanguage(response.data.object.language || 'english');
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        console.log('Token is invalid, redirecting to login');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to fetch user data');
      }
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:8000/api/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/market-data');
      setMarketData(response.data.marketData);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:8000/api/notifications?unreadOnly=true', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:8000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // This would be a separate endpoint for wishlist
      // For now, we'll use a mock wishlist
      setWishlist([
        { id: 1, name: 'Organic Rice', price: 2500, farmer: 'Rajesh Kumar' },
        { id: 2, name: 'Fresh Tomatoes', price: 800, farmer: 'Priya Singh' }
      ]);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLanguageChange = async (newLanguage) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:8000/api/user/language',
        { language: newLanguage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLanguage(newLanguage);
      toast.success('Language updated successfully');
    } catch (error) {
      console.error('Error updating language:', error);
      toast.error('Failed to update language');
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    toast.success('Added to wishlist');
  };

  const handleBuyRequest = async () => {
    try {
      const response = await axios.post('/api/buy-request', {
        productId: selectedProduct._id,
        quantity: buyQuantity,
        message: `I want to buy ${buyQuantity} units of ${selectedProduct.name}`
      });

      toast.success('Buy request sent successfully!');
      setShowBuyModal(false);
      setSelectedProduct(null);
      setBuyQuantity(1);
    } catch (error) {
      console.error('Error sending buy request:', error);
      toast.error('Failed to send buy request');
    }
  };

  const handleContactRequest = async () => {
    try {
      const response = await axios.post('/api/contact-request', {
        productId: selectedProduct._id,
        message: contactMessage
      });

      toast.success('Contact request sent successfully!');
      setShowContactModal(false);
      setSelectedProduct(null);
      setContactMessage('');
    } catch (error) {
      console.error('Error sending contact request:', error);
      toast.error('Failed to send contact request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-2">{t.welcome}</h2>
        <p className="text-blue-100">Discover fresh produce, track your orders, and get the best deals</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FaWallet className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.totalSpent}</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{analytics?.totalSpent || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FaShoppingCart className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.totalOrders}</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.totalOrders || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FaHeart className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.favoriteProducts}</p>
              <p className="text-2xl font-bold text-gray-900">
                {wishlist.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <FaChartLine className="text-orange-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.averageOrder}</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{Math.round(analytics?.averageOrderValue || 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Best Deals and Wishlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Deals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaStar className="mr-2 text-yellow-500" />
            {t.bestDeals}
          </h3>
          <div className="space-y-3">
            {products.slice(0, 3).map((product) => (
              <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">₹{product.price}/{product.unit}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToWishlist(product)}
                    className="text-red-500 hover:text-red-700"
                    title="Add to Wishlist"
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowBuyModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowContactModal(true);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
         <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaHeart className="mr-2 text-red-500" />
            {t.wishlist}
          </h3>
          <div className="space-y-3">
            {wishlist.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No items in wishlist</p>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">₹{item.price} • {item.farmer}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowBuyModal(true);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Buy Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div> 
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">{t.marketTrends}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgPrice" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">{t.recentOrders}</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{order.productId?.name}</p>
                  <p className="text-sm text-gray-600">₹{order.totalAmount}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.marketplace}</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{height:"240px"}}>
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{product.price}/{product.unit}</span>
                <span className="text-sm text-gray-500">{product.availableQuantity} {product.unit} available</span>
              </div>
              <div className="mt-3">
                <span className="text-sm text-gray-500">By:Rohit Sharma </span>
                {/* {product.farmerId?.fullName} */}
                <span className="text-sm text-gray-500 ml-2">•Jewar, Uttar Pradesh </span>
                {/* {product.location?.city}, {product.location?.state} */}
              </div>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => addToWishlist(product)}
                  className="text-red-500 hover:text-red-700"
                  title="Add to Wishlist"
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowBuyModal(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex-1"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowContactModal(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.analytics}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData && marketData.length > 0 ? marketData.slice(0, 10) : [
              { productName: 'Rice', avgPrice: 2400 },
              { productName: 'Wheat', avgPrice: 2000 },
              { productName: 'Vegetables', avgPrice: 1500 },
              { productName: 'Fruits', avgPrice: 1800 },
              { productName: 'Spices', avgPrice: 3000 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="avgPrice" stroke="#3b82f6" fill="#3b82f6" />
            </AreaChart>
          </ResponsiveContainer>
        </div> 

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Category Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.topProducts || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#3b82f6"
                dataKey="totalSold"
              >
                {analytics?.topProducts?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> 
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.notifications}</h2>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-500">{t.noNotifications}</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <motion.div
              key={notification._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${notification.isRead ? 'border-gray-300' : 'border-blue-500'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => markNotificationAsRead(notification._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {t.markAsRead}
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaLanguage className="text-gray-500" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="english">English</option>
                  <option value="hindi">हिंदी</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'marketplace', 'analytics', 'notifications', 'wishlist', 'ai-insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab === 'ai-insights' ? 'AI Insights' : t[tab]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'marketplace' && renderMarketplace()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'notifications' && <NotificationCenter user={user} onNotificationUpdate={fetchNotifications} />}
        {activeTab === 'wishlist' && <Wishlist user={user} />}
        {activeTab === 'ai-insights' && <AIInsights />}
      </main>

      {/* Buy Modal */}
      {showBuyModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Buy {selectedProduct.name}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max={selectedProduct.availableQuantity}
                value={buyQuantity}
                onChange={(e) => setBuyQuantity(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {selectedProduct.availableQuantity} {selectedProduct.unit}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Total: ₹{selectedProduct.price * buyQuantity}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBuyRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
              >
                Send Buy Request
              </button>
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  setSelectedProduct(null);
                  setBuyQuantity(1);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Contact Farmer</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Contact {selectedProduct.farmerId?.fullName} about {selectedProduct.name}
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message to the farmer..."
                className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleContactRequest}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1"
              >
                Send Message
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setSelectedProduct(null);
                  setContactMessage('');
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
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

export default BuyerDashboard; 