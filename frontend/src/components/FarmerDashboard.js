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
  FaPlus, FaSearch, FaFilter, FaLanguage, FaWallet, FaBox, FaSeedling,
  FaLeaf, FaThermometerHalf, FaCloudRain, FaSun, FaTractor
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import NotificationCenter from './NotificationCenter';
import AIInsights from './AIInsights';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [cropRecommendations, setCropRecommendations] = useState([]);

  const translations = {
    english: {
      overview: 'Farm Overview',
      marketplace: 'My Products',
      analytics: 'Farm Analytics',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
      welcome: 'Welcome back, Farmer',
      totalRevenue: 'Total Earnings',
      totalOrders: 'Orders Received',
      activeProducts: 'Active Products',
      averageOrder: 'Average Order Value',
      marketTrends: 'Market Trends',
      recentOrders: 'Recent Orders',
      weather: 'Weather',
      cropRecommendations: 'Crop Recommendations',
      addProduct: 'Add Product',
      searchProducts: 'Search Products',
      filter: 'Filter',
      language: 'Language',
      weatherForecast: 'Weather Forecast',
      soilConditions: 'Soil Conditions',
      irrigation: 'Irrigation Status',
      pestAlerts: 'Pest Alerts',
      harvestSchedule: 'Harvest Schedule'
    },
    hindi: {
      overview: 'खेत की जानकारी',
      marketplace: 'मेरी फसलें',
      analytics: 'खेत विश्लेषण',
      notifications: 'सूचनाएं',
      profile: 'प्रोफ़ाइल',
      logout: 'लॉगआउट',
      welcome: 'किसान पैनल',
      totalRevenue: 'कुल कमाई',
      totalOrders: 'प्राप्त आदेश',
      activeProducts: 'सक्रिय उत्पाद',
      averageOrder: 'औसत आदेश मूल्य',
      marketTrends: 'बाजार रुझान',
      recentOrders: 'हाल के आदेश',
      weather: 'मौसम',
      cropRecommendations: 'फसल सिफारिशें',
      addProduct: 'नई फसल जोड़ें',
      searchProducts: 'उत्पाद खोजें',
      filter: 'फ़िल्टर',
      language: 'भाषा',
      weatherForecast: 'मौसम पूर्वानुमान',
      soilConditions: 'मिट्टी की स्थिति',
      irrigation: 'सिंचाई स्थिति',
      pestAlerts: 'कीट अलर्ट',
      harvestSchedule: 'फसल कटाई अनुसूची'
    }
  };

  const t = translations[language];


const handleRemoveProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(
      `http://localhost:8000/api/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

    toast.success('Product removed successfully');

  } catch (error) {
    console.log("DELETE ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("SERVER MESSAGE:", error.response?.data);

    toast.error(
      error.response?.data?.message || "Failed to remove product"
    );
  }
};


  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('FarmerDashboard useEffect - Token:', token);

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
    fetchWeatherData();
    fetchCropRecommendations();
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
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:8000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
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

  const fetchWeatherData = async () => {
    try {
      // Using OpenWeatherMap API for weather data
      const city = user?.city || 'Mumbai';
      const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // You'll need to get a free API key
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Fallback weather data
      setWeatherData({
        main: { temp: 25, humidity: 65 },
        weather: [{ description: 'Partly cloudy' }],
        wind: { speed: 5 }
      });
    }
  };

  const fetchCropRecommendations = async () => {
    try {
      // Using AI service for crop recommendations based on location and weather
      const location = `${user?.city}, ${user?.state}`;
      const response = await axios.post('http://localhost:8000/api/ai-insights', {
        location: location,
        weather: weatherData,
        requestType: 'cropRecommendations'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCropRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching crop recommendations:', error);
      // Fallback recommendations
      setCropRecommendations([
        { name: 'Wheat', season: 'Rabi', profit: 'High', reason: 'Good market demand' },
        { name: 'Rice', season: 'Kharif', profit: 'Medium', reason: 'Stable prices' },
        { name: 'Tomatoes', season: 'All year', profit: 'High', reason: 'High demand in local market' }
      ]);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-2">{t.welcome}</h2>
        <p className="text-green-100">Manage your farm, track your products, and grow your business</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FaWallet className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.totalRevenue}</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{analytics?.totalRevenue || 0}
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
            <div className="p-3 rounded-full bg-blue-100">
              <FaShoppingCart className="text-blue-600 text-xl" />
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
              <FaBox className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.activeProducts}</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.length}
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

      {/* Weather and Crop Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaThermometerHalf className="mr-2 text-blue-500" />
            {t.weatherForecast}
          </h3>
          {weatherData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temperature</span>
                <span className="font-semibold">{weatherData.main?.temp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-semibold">{weatherData.main?.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Wind Speed</span>
                <span className="font-semibold">{weatherData.wind?.speed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="font-semibold capitalize">{weatherData.weather?.[0]?.description}</span>
              </div>
            </div>
          )}
        </div>

        {/* Crop Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaSeedling className="mr-2 text-green-500" />
            {t.cropRecommendations}
          </h3>
          <div className="space-y-3">
            {cropRecommendations.map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-semibold">{crop.name}</h4>
                  <p className="text-sm text-gray-600">{crop.season} • {crop.reason}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${crop.profit === 'High' ? 'bg-green-100 text-green-800' :
                  crop.profit === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {crop.profit} Profit
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">{t.marketTrends}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData && marketData.length > 0 ? marketData.slice(0, 10) : [
              { productName: 'Rice', avgPrice: 2500 },
              { productName: 'Wheat', avgPrice: 2100 },
              { productName: 'Corn', avgPrice: 1800 },
              { productName: 'Potatoes', avgPrice: 1200 },
              { productName: 'Tomatoes', avgPrice: 1500 }
            ]}>
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
        <button
          onClick={() => navigate('/add-product')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <FaPlus />
          <span>{t.addProduct}</span>
        </button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {products.map((product) => (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">
            ₹{product.price} {product.unit}
          </span>

          <span className="text-sm text-gray-500">
            {product.availableQuantity} {product.unit} available
          </span>
        </div>

        <div className="mt-3">
          <span className="text-sm text-gray-500">
            Location: {product.location?.city}, {product.location?.state}
          </span>
        </div>

        <div className="mt-3 flex space-x-2 mt-auto">
          {/* <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            Edit
          </button> */}

          <button
            onClick={() => handleRemoveProduct(product._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 mt-2"
          >
           फसल हटाएं
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
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          {orders.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={orders.reduce((acc, order) => {
                const date = new Date(order.createdAt).toLocaleDateString();
                const existing = acc.find(item => item.date === date);
                if (existing) {
                  existing.amount += order.totalAmount;
                } else {
                  acc.push({ date, amount: order.totalAmount });
                }
                return acc;
              }, []).sort((a, b) => new Date(a.date) - new Date(b.date))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#22c55e" fill="#22c55e" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
              <p>No revenue data generated yet</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.topProducts || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#22c55e"
                dataKey="totalSold"
              >
                {analytics?.topProducts?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#22c55e', '#16a34a', '#15803d', '#166534'][index % 4]} />
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
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${notification.isRead ? 'border-gray-300' : 'border-green-500'
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
                    className="text-green-600 hover:text-green-800 text-sm"
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
            {['overview', 'marketplace', 'analytics', 'notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-green-500 text-green-600'
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
        {activeTab === 'ai-insights' && <AIInsights />}
      </main>
    </div>
  );
};

export default FarmerDashboard; 