const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticateToken } = require('../middlewares/auth');

// Place a new order
router.post('/', authenticateToken, orderController.placeOrder);
// Get all orders for the user
router.get('/', authenticateToken, orderController.getUserOrders);
// Get order details by ID
router.get('/:id', authenticateToken, orderController.getOrderById);

module.exports = router; 