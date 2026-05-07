const express = require("express");
const router = express.Router();

const {
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../Controllers/cartItemController");

const { protect } = require("../Middleware/authMiddleware");

router.post("/create", protect, createCartItem);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, deleteCartItem);

module.exports = router;
