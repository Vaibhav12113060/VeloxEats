const express = require("express");
const router = express.Router();

const {
  getMyCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../Controllers/cartController");

const { protect } = require("../Middlewares/authMiddleware");

router.use(protect);

router.route("/").get(getMyCart).delete(clearCart);
router.route("/item").post(addItemToCart);
router.route("/item/:itemId").put(updateCartItem).delete(removeCartItem);
module.exports = router;
