const express = require("express");
const router = express.Router();
const user = require("./user.route");
const product = require("./product.route");
const wishlist = require("./wishlist.route");
const order = require("./order.route");
const payment = require("./payment.route");

router.use("/user", user);
router.use("/product", product);
router.use("/wishlist", wishlist);
router.use("/order", order);
router.use("/payment", payment);

module.exports = router;
