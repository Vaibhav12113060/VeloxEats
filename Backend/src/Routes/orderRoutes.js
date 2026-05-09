const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getRestaurantOrders,
} = require("../Controllers/orderController");

const {
  protect,
  adminOnly,
  restaurantOnly,
} = require("../Middlewares/authMiddleware");

// Customer routes
router.post("/create", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin / Staff routes
router.get("/", protect, adminOnly, getAllOrders);
router.get(
  "/restaurant/:restaurantId",
  protect,
  restaurantOnly,
  getRestaurantOrders,
);
router.put("/:id/status", protect, restaurantOnly, updateOrderStatus); // chefOnly allows admin too

module.exports = router;
