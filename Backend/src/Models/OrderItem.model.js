const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  menu_item_id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
  quantity: Number,
  price_at_time: Number,
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
