const Payment = require('../models/payment.model');
const Order = require('../models/order.model');

// Make a payment (mock, always successful)
exports.makePayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, cardHolderName, email, cardNumber } = req.body;
    const order = await Order.findOne({ _id: orderId, user: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    // Only store last 4 digits of card number
    const cardLast4 = cardNumber ? cardNumber.slice(-4) : undefined;
    const payment = new Payment({
      user: req.user.id,
      order: orderId,
      amount: order.totalPrice,
      paymentMethod,
      cardHolderName,
      email,
      cardLast4,
      status: 'Completed'
    });
    await payment.save();
    // Optionally, update order status to 'Paid' (if you add such a field)
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get payment info for an order
exports.getPaymentByOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId, user: req.user.id });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 