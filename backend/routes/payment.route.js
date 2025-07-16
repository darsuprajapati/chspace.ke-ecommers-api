const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { authenticateToken } = require('../middlewares/auth');

// Make a payment
router.post('/', authenticateToken, paymentController.makePayment);
// Get payment info for an order
router.get('/:orderId', authenticateToken, paymentController.getPaymentByOrder);

module.exports = router; 