const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  method: { type: String, enum: ["UPI", "Card", "COD"] },
  status: String,
  transaction_id: String,
  paid_at: Date,
});

module.exports = mongoose.model("Payment", paymentSchema);
