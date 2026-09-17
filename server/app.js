require('dotenv').config();
const express = require('express');
require('./db/connection');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const paymentController = require('./controllers/paymentController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Import models
const Users = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const MarketData = require('./models/marketDataModel');
const Notification = require('./models/notificationModel');
const Wishlist = require('./models/wishlistModel');


// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors());
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many login attempts. Please try again later."
  }
});

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const port = process.env.PORT || 8000;

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Helper function to send notifications
const sendNotification = async (
  recipient,
  sender,
  title,
  message,
  type,
  productId = null,
  orderId = null
) => {
  try {
    const notification = new Notification({
      recipient,
      sender,
      title,
      message,
      type,
      productId,
      orderId
    });

    await notification.save();

    // Send real-time notification
    io.to(recipient.toString()).emit('notification', {
      recipient: recipient.toString(),
      notification
    });

  } catch (error) {
    console.error('Error sending notification:', error);
  }
};


// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required', status: 401 });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await Users.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token', status: 401 });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', status: 401 });
  }
};

// Routes
app.get('/', (req, res) => {
  res.send("KrishiConnect Backend API");
});

// User Registration with user type
app.post('/api/register',limiter,  async (req, res) => {
  try {
    const {
      fullname,
      phone,
      password,
      country,
      userType,
      state,
      city,
      address
    } = req.body;

    if (!fullname || !password || !phone || !userType) {
      return res.status(400).json({
        message: 'Please fill all required details',
        status: 400
      });
    }

    const isUserAlreadyExist = await Users.findOne({ phone });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: 'Phone number already exists',
        status: 400
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const newUser = new Users({
      fullName: fullname,
      password: hashedpassword,
      phone,
      userType,
      country,
      state,
      city,
      address,
      coins: 0,
      amount: 0
    });

    await newUser.save();

    // Send welcome notification
    await sendNotification(
    newUser._id,
    newUser._id,
    'KrishiConnect में आपका स्वागत है!',
    `नमस्ते ${fullname}! आपने ${userType} के रूप में सफलतापूर्वक पंजीकरण किया है।`,
    'approval'
);
    

    return res.status(200).json({
      message: 'User Registered Successfully',
      status: 200
    });

  } catch (error) {
    console.log(error, "signup backend error");

    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500
    });
  }
});

// Login
app.post('/api/login',limiter, async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: 'Please fill all the required details',
        status: 400
      });
    }

    const user = await Users.findOne({ phone });

    if (!user) {
      return res.status(400).json({
        message: 'User Phone or Password is Incorrect',
        status: 400
      });
    }

    const validateUser = await bcryptjs.compare(password, user.password);

    if (!validateUser) {
      return res.status(400).json({
        message: 'User Phone or Password is Incorrect',
        status: 400
      });
    }

    const payload = {
      userId: user._id,
      phone: user.phone
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      return res.status(500).json({
        message: 'Server Configuration Error',
        status: 500
      });
    }

    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '7d' }, async (err, token) => {
      if (err) {
        return res.status(500).json({
          message: 'Token generation failed',
          status: 500
        });
      }

      await Users.updateOne(
        { _id: user._id },
        { $set: { token } }
      );

      return res.status(200).json({
        user: {
          id: user._id,
          phone: user.phone,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType,
          language: user.language
        },
        token: token,
        message: "User signed in successfully",
        status: 200
      });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 500
    });
  }
});


// Get user data
app.post('/api/userData', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const object = {
      name: user.fullName,
      amount: user.amount,
      country: user.country,
      userType: user.userType,
      language: user.language,
      state: user.state,
      city: user.city,
      address: user.address,
      isVerified: user.isVerified
    };

    return res.status(200).json({ message: 'User Data Fetched', object, status: 200 });
  } catch (error) {
    console.log(error, "user data fetch error");
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Product Management
app.post('/api/products', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    console.log("USER:", req.user);
    if (req.user.userType !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can add products', status: 403 });
    }

    const {
       name, category, price, unit, quantity,
      state, city, address, harvestDate, expiryDate,
    } = req.body;


    const product = new Product({
      farmerId: req.user._id,
      farmer: req.user._id,
      name,
      category,
      price: Number(price),
      unit,
      quantity: Number(quantity),
      availableQuantity: Number(quantity),
      location: { state, city, address },
      harvestDate: harvestDate ? new Date(harvestDate) : null,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
    });

    await product.save();


    await sendNotification(
    req.user._id,
    req.user._id,
    'उत्पाद सफलतापूर्वक जोड़ा गया',
    `आपका उत्पाद "${name}" सफलतापूर्वक जोड़ दिया गया है।`,
    'approval',
    product._id
);

    return res.status(201).json({ message: 'Product added successfully', product, status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Get all products with filters
app.get('/api/products', async (req, res) => {
  try {
    const { category, state, city, minPrice, maxPrice, search, farmerId } = req.query;

    let filter = { isAvailable: true };

    if (category) filter.category = category;
    if (state) filter['location.state'] = state;
    if (city) filter['location.city'] = city;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (farmerId) filter.farmerId = farmerId;

    const products = await Product.find(filter)
      .populate('farmerId', 'fullName state city')
      .sort({ createdAt: -1 });

    return res.status(200).json({ products, status: 200 });
  } catch (error) {
    console.error('Product fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmerId', 'fullName phone state city');

    if (!product) {
      return res.status(404).json({ message: 'Product not found', status: 404 });
    }

    return res.status(200).json({ product, status: 200 });
  } catch (error) {
    console.error('Product fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});


// Delete api
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    console.log("Product ID:", req.params.id);
    console.log("Logged in user ID:", req.user._id);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    console.log("Product farmerId:", product.farmerId);

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'Product removed successfully'
    });

  } catch (error) {
    console.error('Product delete error:', error);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// Order Management
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'buyer') {
      return res.status(403).json({ message: 'Only buyers can place orders', status: 403 });
    }

    const { productId, quantity, deliveryAddress, deliveryMethod, notes } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found', status: 404 });
    }

    if (product.availableQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity available', status: 400 });
    }

    const totalAmount = product.price * quantity;

    const order = new Order({
      buyerId: req.user._id,
      farmerId: product.farmerId,
      productId,
      quantity,
      totalAmount,
      deliveryAddress,
      deliveryMethod,
      notes
    });

    await order.save();

    // Update product quantity
    product.availableQuantity -= quantity;
    if (product.availableQuantity === 0) {
      product.isAvailable = false;
    }
    await product.save();

    // Send notifications
    await sendNotification(
  req.user._id,
  req.user._id,
  'ऑर्डर सफलतापूर्वक दिया गया',
  `आपका ${product.name} का ऑर्डर सफलतापूर्वक दिया गया है।`,
  'order_status',
  product._id,
  order._id
);

await sendNotification(
  product.farmerId,
  req.user._id,
  'नया ऑर्डर प्राप्त हुआ',
  `आपको ${product.name} का एक नया ऑर्डर प्राप्त हुआ है।`,
  'order_status',
  product._id,
  order._id
);

    return res.status(201).json({ message: 'Order placed successfully', order, status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (req.user.userType === 'buyer') {
      filter.buyerId = req.user._id;
    } else {
      filter.farmerId = req.user._id;
    }

    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('productId', 'name images price unit')
      .populate('buyerId', 'fullName phone')
      .populate('farmerId', 'fullName phone')
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders, status: 200 });
  } catch (error) {
    console.error('Order fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Update order status
app.patch('/api/orders/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found', status: 404 });
    }

    if (order.farmerId.toString() !== req.user._id.toString() &&
      order.buyerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized', status: 403 });
    }

    order.status = status;
    await order.save();

    // Send notification to the other party
    const notifyUserId = order.farmerId.toString() === req.user._id.toString()
      ? order.buyerId
      : order.farmerId;


      await sendNotification(
  notifyUserId,
  req.user._id,
  'ऑर्डर की स्थिति अपडेट की गई',
  `आपके ऑर्डर की स्थिति "${status}" कर दी गई है।`,
  'order_status',
  order.productId,
  order._id
);


    return res.status(200).json({ message: 'Order status updated', order, status: 200 });
  } catch (error) {
    console.error('Order update error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Market Data and Analytics
app.get('/api/market-data', async (req, res) => {
  try {
    const { productName, category, state, city } = req.query;

    let filter = {};
    if (productName) filter.productName = { $regex: productName, $options: 'i' };
    if (category) filter.category = category;
    if (state) filter.state = state;
    if (city) filter.city = city;

    const marketData = await MarketData.find(filter)
      .sort({ date: -1 })
      .limit(50);

    return res.status(200).json({ marketData, status: 200 });
  } catch (error) {
    console.error('Market data fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// AI-Powered Analytics and Insights
app.get('/api/analytics', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let analytics = {};

    if (req.user.userType === 'farmer') {
      // Farmer analytics
      const products = await Product.find({
        farmerId: req.user._id,
        createdAt: { $gte: startDate }
      });

      const orders = await Order.find({
        farmerId: req.user._id,
        createdAt: { $gte: startDate }
      });

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalOrders = orders.length;
      const activeProducts = products.filter(p => p.isAvailable).length;

      analytics = {
        totalRevenue,
        totalOrders,
        activeProducts,
        averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        topProducts: await getTopProducts(req.user._id, days)
      };
    } else {
      // Buyer analytics
      const orders = await Order.find({
        buyerId: req.user._id,
        createdAt: { $gte: startDate }
      });

      const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalOrders = orders.length;

      analytics = {
        totalSpent,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
        favoriteCategories: await getFavoriteCategories(req.user._id, days)
      };
    }

    return res.status(200).json({ analytics, status: 200 });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Helper function for top products
async function getTopProducts(farmerId, days) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const orders = await Order.aggregate([
    { $match: { farmerId: farmerId, createdAt: { $gte: startDate } } },
    { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } },
    { $unwind: '$product' },
    { $group: { _id: '$productId', totalSold: { $sum: '$quantity' }, productName: { $first: '$product.name' } } },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }
  ]);

  return orders;
}

// Helper function for favorite categories
async function getFavoriteCategories(buyerId, days) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const orders = await Order.aggregate([
    { $match: { buyerId: buyerId, createdAt: { $gte: startDate } } },
    { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } },
    { $unwind: '$product' },
    { $group: { _id: '$product.category', totalOrders: { $sum: 1 } } },
    { $sort: { totalOrders: -1 } },
    { $limit: 5 }
  ]);

  return orders;
}

// Notifications
app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const { unreadOnly = false } = req.query;

    let filter = { recipient: req.user._id };
    if (unreadOnly === 'true') {
      filter.isRead = false;
    }

    const notifications = await Notification.find(filter)
      .populate('sender', 'fullName email')
      .populate('productId', 'name price')
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Notification fetch error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Mark notification as read
app.patch('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true, status: 'read' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found', status: 404 });
    }

    return res.status(200).json({ notification, status: 200 });
  } catch (error) {
    console.error('Notification update error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Create buy request notification
app.post('/api/buy-request', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity, message } = req.body;

    const product = await Product.findById(productId).populate('farmerId');

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    if (!product.farmerId) {
      return res.status(400).json({
        message: 'Farmer information not found for this product'
      });
    }

    const notification = new Notification({
      recipient: product.farmerId._id,
      sender: req.user._id,
      type: 'buy_request',
      title: 'नई खरीदारी का अनुरोध',
      message: `${req.user.fullName} ${quantity} ${product.unit} ${product.name} खरीदना चाहते हैं।`,
      productId: product._id,
      actionRequired: true,
      actionType: 'approve',
      metadata: {
        quantity: Number(quantity),
        message,
        buyerId: req.user._id,
        buyerName: req.user.fullName
      }
    });

    await notification.save();

    io.to(product.farmerId._id.toString()).emit('notification', {
      recipient: product.farmerId._id.toString(),
      notification
    });

    return res.status(200).json({
      message: 'खरीदारी का अनुरोध सफलतापूर्वक भेज दिया गया',
      notification
    });

  } catch (error) {
    console.error('BUY REQUEST ERROR:', error);

    return res.status(500).json({
      message: error.message,
      status: 500
    });
  }
});


// Create contact request notification
app.post('/api/contact-request', authenticateToken, async (req, res) => {
  try {
    const { productId, message } = req.body;

    const product = await Product.findById(productId).populate('farmerId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create notification for farmer
    const notification = new Notification({
      recipient: product.farmerId._id,
      sender: req.user._id,
      type: 'contact_request',
      title: 'संपर्क करने का अनुरोध',
      message: `${req.user.fullName} आपसे ${product.name} के बारे में संपर्क करना चाहते हैं।`,
      productId: productId,
      actionRequired: true,
      actionType: 'contact',
      metadata: {
        message,
        buyerId: req.user._id,
        buyerName: req.user.fullName,
        buyerEmail: req.user.email
      }
    });

    await notification.save();
    io.emit('notification', {
      recipient: product.farmerId._id.toString(),
      notification: notification
    });

    res.json({
      message: 'Contact request sent successfully',
      notification: notification
    });
  } catch (error) {
    console.error('Error creating contact request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Farmer approves/rejects buy request
app.post('/api/approve-request', authenticateToken, async (req, res) => {
  try {
    const { notificationId, action, orderDetails } = req.body;

    const notification = await Notification.findById(notificationId)
      .populate('sender')
      .populate('productId');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (action === 'approve') {
      // Create order
      const order = new Order({
        buyerId: notification.sender._id,
        farmerId: req.user._id,
        productId: notification.productId._id,
        quantity: notification.metadata.quantity,
        totalAmount: notification.productId.price * notification.metadata.quantity,
        status: 'pending',
        paymentStatus: 'pending'
      });

      await order.save();

      // Create approval notification for buyer
      const approvalNotification = new Notification({
        recipient: notification.sender._id,
        sender: req.user._id,
        type: 'approval',
        title: 'खरीदारी का अनुरोध स्वीकार किया गया',
        message: `${req.user.fullName} ने आपके ${notification.productId.name} के खरीदारी अनुरोध को स्वीकार कर लिया है।`,
        productId: notification.productId._id,
        orderId: order._id,
        actionRequired: true,
        actionType: 'payment',
        metadata: {
          orderId: order._id,
          totalAmount: order.totalAmount
        }
      });

      await approvalNotification.save();

      // Update original notification
      notification.status = 'actioned';
      await notification.save();

      // Emit real-time notifications
      io.emit('notification', {
        recipient: notification.sender._id.toString(),
        notification: approvalNotification
      });

      res.json({
        message: 'Request approved successfully',
        order: order,
        notification: approvalNotification
      });

    } else if (action === 'reject') {
      // Create rejection notification for buyer
      const rejectionNotification = new Notification({
        recipient: notification.sender._id,
        sender: req.user._id,
        type: 'rejection',
        title: 'खरीदारी का अनुरोध अस्वीकार किया गया',
        message: `${req.user.fullName} ने आपके ${notification.productId.name} के खरीदारी अनुरोध को अस्वीकार कर दिया है।`,
        productId: notification.productId._id
      });

      await rejectionNotification.save();

      // Update original notification
      notification.status = 'actioned';
      await notification.save();

      // Emit real-time notification
      io.emit('notification', {
        recipient: notification.sender._id.toString(),
        notification: rejectionNotification
      });

      res.json({
        message: 'Request rejected successfully',
        notification: rejectionNotification
      });
    }

  } catch (error) {
    console.error('Error processing approval:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Razorpay Payment Routes
app.post('/api/payment/create-order', authenticateToken, paymentController.createOrder);
app.post('/api/payment/verify', authenticateToken, paymentController.verifyPayment);
app.get('/api/payment/:paymentId', authenticateToken, paymentController.getPaymentDetails);
app.post('/api/payment/refund', authenticateToken, paymentController.refundPayment);

// Wishlist endpoints
app.post('/api/wishlist/add', authenticateToken, async (req, res) => {
  try {
    const { productId, notes, priority } = req.body;

    const existingItem = await Wishlist.findOne({
      buyer: req.user._id,
      product: productId
    });

    if (existingItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      buyer: req.user._id,
      product: productId,
      notes,
      priority
    });

    await wishlistItem.save();

    res.json({
      message: 'Product added to wishlist',
      wishlistItem
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/wishlist', authenticateToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ buyer: req.user._id })
      .populate('product')
      .populate('product.farmerId', 'fullName email')
      .sort({ createdAt: -1 });

    res.json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/api/wishlist/:id', authenticateToken, async (req, res) => {
  try {
    const { notes, priority } = req.body;

    const wishlistItem = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, buyer: req.user._id },
      { notes, priority },
      { new: true }
    );

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json(wishlistItem);
  } catch (error) {
    console.error('Error updating wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/api/wishlist/:id', authenticateToken, async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      buyer: req.user._id
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/wishlist/:id/contact', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    const wishlistItem = await Wishlist.findById(req.params.id)
      .populate('product')
      .populate('product.farmerId');

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    if (wishlistItem.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Create contact request notification
    const notification = new Notification({
      recipient: wishlistItem.product.farmerId._id,
      sender: req.user._id,
      type: 'contact_request',
      title: 'संपर्क करने का अनुरोध',
      message: `${req.user.fullName} आपसे ${wishlistItem.product.name} के बारे में संपर्क करना चाहते हैं।`,
      productId: wishlistItem.product._id,
      actionRequired: true,
      actionType: 'contact',
      metadata: {
        message,
        buyerId: req.user._id,
        buyerName: req.user.fullName,
        buyerEmail: req.user.email
      }
    });

    await notification.save();

    // Update wishlist item
    wishlistItem.contactRequested = true;
    wishlistItem.contactRequestDate = new Date();
    await wishlistItem.save();

    // Emit real-time notification
    io.emit('notification', {
      recipient: wishlistItem.product.farmerId._id.toString(),
      notification: notification
    });

    res.json({
      message: 'Contact request sent successfully',
      notification: notification
    });
  } catch (error) {
    console.error('Error sending contact request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update user language preference
app.patch('/api/user/language', authenticateToken, async (req, res) => {
  try {
    const { language } = req.body;

    if (!['english', 'hindi'].includes(language)) {
      return res.status(400).json({ message: 'Invalid language', status: 400 });
    }

    await Users.findByIdAndUpdate(req.user._id, { language });

    return res.status(200).json({ message: 'Language updated successfully', status: 200 });
  } catch (error) {
    console.error('Language update error:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Payment routes (existing)
app.post('/api/deposit', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const product = ["Deposit"];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: product.map(item => {
        return {
          price_data: {
            currency: currency,
            product_data: {
              name: "Deposit money"
            },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      }),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    return res.json({
      url: session?.url,
      amount: amount
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 400,
    });
  }
});

app.post('/api/addmoney', async (req, res) => {
  try {
    const { amount, email } = req.body;
    const user = await Users.findOne({ email });
    user.amount = Number(user.amount) + Number(amount);
    await user.save();

    return res.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 400,
    });
  }
});

app.post('/api/widthdraw', async (req, res) => {
  try {
    const { email, amount } = req.body;
    const user = await Users.findOne({ email });
    user.amount = Number(user.amount) - Number(amount);
    await user.save();

    return res.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 400,
    });
  }
});

cron.schedule('0 6 * * *', async () => {
  try {
    console.log('Updating market data...');
    const sampleProducts = ['Rice', 'Wheat', 'Tomatoes', 'Potatoes', 'Onions'];
    const states = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu'];

    for (const product of sampleProducts) {
      for (const state of states) {
        const marketData = new MarketData({
          productName: product,
          category: 'grains',
          state,
          minPrice: Math.floor(Math.random() * 50) + 20,
          maxPrice: Math.floor(Math.random() * 100) + 50,
          avgPrice: Math.floor(Math.random() * 75) + 35,
          unit: 'kg',
          demand: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          supply: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)]
        });
        await marketData.save();
      }
    }
    console.log('Market data updated successfully');
  } catch (error) {
    console.error('Error updating market data:', error);
  }
});

server.listen(port, () => {
  console.log('KrishiConnect server listening on port ' + port);
});