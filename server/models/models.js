const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
  tableNumber: Number,
  orderType: { type: String, enum: ['dine-in', 'takeaway', 'delivery'], default: 'dine-in' },
  createdAt: { type: Date, default: Date.now }
});

// Table Reservation Schema
const reservationSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tableNumber: { type: Number, required: true },
  guests: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  specialRequests: String,
  createdAt: { type: Date, default: Date.now }
});

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  minThreshold: { type: Number, default: 10 },
  supplier: String,
  lastUpdated: { type: Date, default: Date.now }
});

// Bill Schema
const billSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card', 'upi'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Staff Schema
const staffSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  shift: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true },
  joinDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  category: { type: String, enum: ['food', 'service', 'ambiance', 'overall'] },
  createdAt: { type: Date, default: Date.now }
});

// Export all models
module.exports = {
  User: mongoose.model('User', userSchema),
  MenuItem: mongoose.model('MenuItem', menuItemSchema),
  Order: mongoose.model('Order', orderSchema),
  Reservation: mongoose.model('Reservation', reservationSchema),
  Inventory: mongoose.model('Inventory', inventorySchema),
  Bill: mongoose.model('Bill', billSchema),
  Staff: mongoose.model('Staff', staffSchema),
  Feedback: mongoose.model('Feedback', feedbackSchema)
};