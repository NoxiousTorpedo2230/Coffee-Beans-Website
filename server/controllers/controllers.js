const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, MenuItem, Order, Reservation, Inventory, Bill, Staff, Feedback } = require('../models/models');

// JWT Secret with fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key_for_development';

// Auth Controllers
const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone, role } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, phone, role });
      await user.save();
      
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
      res.status(201).json({ 
        token, 
        user: { id: user._id, name, email, phone, role },
        message: 'User registered successfully' 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Menu Controllers
const menuController = {
  // Get all menu items
  getMenuItems: async (req, res) => {
    try {
      const items = await MenuItem.find({ isAvailable: true });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create menu item
  createMenuItem: async (req, res) => {
    try {
      const item = new MenuItem(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update menu item
  updateMenuItem: async (req, res) => {
    try {
      const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete menu item
  deleteMenuItem: async (req, res) => {
    try {
      await MenuItem.findByIdAndDelete(req.params.id);
      res.json({ message: 'Menu item deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Order Controllers
const orderController = {
  // Create order
  createOrder: async (req, res) => {
    try {
      const order = new Order({ ...req.body, customer: req.user.userId });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get orders
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('customer', 'name email').populate('items.menuItem');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Reservation Controllers
const reservationController = {
  // Create reservation
  createReservation: async (req, res) => {
    try {
      const reservation = new Reservation({ ...req.body, customer: req.user.userId });
      await reservation.save();
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get reservations
  getReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find().populate('customer', 'name email phone');
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update reservation status
  updateReservationStatus: async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Inventory Controllers
const inventoryController = {
  // Get inventory
  getInventory: async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add inventory item
  addInventoryItem: async (req, res) => {
    try {
      const item = new Inventory(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update inventory
  updateInventory: async (req, res) => {
    try {
      const item = await Inventory.findByIdAndUpdate(
        req.params.id,
        { ...req.body, lastUpdated: Date.now() },
        { new: true }
      );
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Bill Controllers
const billController = {
  // Create bill
  createBill: async (req, res) => {
    try {
      const bill = new Bill(req.body);
      await bill.save();
      res.status(201).json(bill);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get bills
  getBills: async (req, res) => {
    try {
      const bills = await Bill.find().populate('order');
      res.json(bills);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update payment status
  updatePaymentStatus: async (req, res) => {
    try {
      const bill = await Bill.findByIdAndUpdate(
        req.params.id,
        { paymentStatus: req.body.paymentStatus },
        { new: true }
      );
      res.json(bill);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Staff Controllers
const staffController = {
  // Get staff
  getStaff: async (req, res) => {
    try {
      const staff = await Staff.find({ isActive: true }).populate('user', 'name email phone');
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add staff
  addStaff: async (req, res) => {
    try {
      const staff = new Staff(req.body);
      await staff.save();
      res.status(201).json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update staff
  updateStaff: async (req, res) => {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Feedback Controllers
const feedbackController = {
  // Create feedback
  createFeedback: async (req, res) => {
    try {
      const feedback = new Feedback({ ...req.body, customer: req.user.userId });
      await feedback.save();
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get feedback
  getFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.find().populate('customer', 'name').populate('order');
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Analytics Controllers
const analyticsController = {
  // Get basic analytics
  getAnalytics: async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const totalRevenue = await Bill.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);
      
      const topMenuItems = await Order.aggregate([
        { $unwind: '$items' },
        { $group: { _id: '$items.menuItem', totalQuantity: { $sum: '$items.quantity' } } },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'menuitems', localField: '_id', foreignField: '_id', as: 'menuItem' } }
      ]);

      res.json({
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        topMenuItems,
        lowStockItems: await Inventory.find({ $expr: { $lt: ['$quantity', '$minThreshold'] } })
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  authController,
  menuController,
  orderController,
  reservationController,
  inventoryController,
  billController,
  staffController,
  feedbackController,
  analyticsController
};