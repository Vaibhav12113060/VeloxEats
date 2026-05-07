const express = require("express");
const router = express.Router();

const {
  createOrderItem,
  getOrderItemsByOrder,
  deleteOrderItem,
} = require("../Controllers/orderItemController");

const { protect, adminOnly } = require("../Middlewares/authMiddleware");

router.post("/create", protect, createOrderItem);
router.get("/order/:orderId", protect, getOrderItemsByOrder);
router.delete("/:id", protect, adminOnly, deleteOrderItem);

module.exports = router;
