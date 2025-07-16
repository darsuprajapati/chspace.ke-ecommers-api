const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { authenticateToken } = require('../middlewares/auth');


// Get wishlist
router.get('/', authenticateToken, wishlistController.getWishlist);
// Add to wishlist
router.post('/', authenticateToken, wishlistController.addToWishlist);
// Remove from wishlist
router.delete('/:productId', authenticateToken, wishlistController.removeFromWishlist);

module.exports = router; 