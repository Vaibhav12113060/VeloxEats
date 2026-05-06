const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  menu_item_id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
  quantity: Number,
  price_at_time: Number,
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

cartItemSchema.index({ cart_id: 1 });

module.exports = mongoose.model("CartItem", cartItemSchema);
