const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPaymentByOrder,
} = require("../Controllers/paymentController");

const { protect } = require("../Middlewares/authMiddleware");

router.post("/create", protect, createPayment);
router.get("/order/:orderId", protect, getPaymentByOrder);

module.exports = router;
