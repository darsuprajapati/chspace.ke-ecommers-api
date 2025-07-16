const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

// Get all wishlist items for the logged-in user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id }).populate('product');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    // Check if already in wishlist
    const exists = await Wishlist.findOne({ user: req.user.id, product: productId });
    if (exists) return res.status(400).json({ error: 'Product already in wishlist' });
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const wishlistItem = new Wishlist({ user: req.user.id, product: productId });
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Wishlist.findOneAndDelete({ user: req.user.id, product: productId });
    if (!deleted) return res.status(404).json({ error: 'Item not found in wishlist' });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 