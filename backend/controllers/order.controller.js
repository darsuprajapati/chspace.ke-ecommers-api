const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { products, estimatedArrival } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products are required' });
    }
    // Calculate total price and build order products array
    let totalPrice = 0;
    const orderProducts = [];
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      const price = item.price || product.price;
      const quantity = item.quantity || 1;
      totalPrice += price * quantity;
      orderProducts.push({
        productId: product._id,
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images[0] : '',
        price: price,
        color: item.color || product.selectedColor || '',
        quantity: quantity
      });
    }
    const order = new Order({
      user: req.user.id,
      products: orderProducts,
      status: 'On Process',
      estimatedArrival,
      totalPrice
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 