const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const {
  authController,
  menuController,
  orderController,
  reservationController,
  inventoryController,
  billController,
  staffController,
  feedbackController,
  analyticsController
} = require('../controllers/controllers');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Menu Routes
router.get('/menu', menuController.getMenuItems);
router.post('/menu', authMiddleware, adminMiddleware, menuController.createMenuItem);
router.put('/menu/:id', authMiddleware, adminMiddleware, menuController.updateMenuItem);
router.delete('/menu/:id', authMiddleware, adminMiddleware, menuController.deleteMenuItem);

// Order Routes
router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getOrders);
router.put('/orders/:id/status', authMiddleware, orderController.updateOrderStatus);

// Reservation Routes
router.post('/reservations', authMiddleware, reservationController.createReservation);
router.get('/reservations', authMiddleware, reservationController.getReservations);
router.put('/reservations/:id/status', authMiddleware, reservationController.updateReservationStatus);

// Inventory Routes
router.get('/inventory', authMiddleware, adminMiddleware, inventoryController.getInventory);
router.post('/inventory', authMiddleware, adminMiddleware, inventoryController.addInventoryItem);
router.put('/inventory/:id', authMiddleware, adminMiddleware, inventoryController.updateInventory);

// Bill Routes
router.post('/bills', authMiddleware, billController.createBill);
router.get('/bills', authMiddleware, billController.getBills);
router.put('/bills/:id/payment', authMiddleware, billController.updatePaymentStatus);

// Staff Routes
router.get('/staff', authMiddleware, adminMiddleware, staffController.getStaff);
router.post('/staff', authMiddleware, adminMiddleware, staffController.addStaff);
router.put('/staff/:id', authMiddleware, adminMiddleware, staffController.updateStaff);

// Feedback Routes
router.post('/feedback', authMiddleware, feedbackController.createFeedback);
router.get('/feedback', authMiddleware, adminMiddleware, feedbackController.getFeedback);

// Analytics Routes
router.get('/analytics', authMiddleware, adminMiddleware, analyticsController.getAnalytics);

module.exports = router;