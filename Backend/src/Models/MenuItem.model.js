const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" },
  name: String,
  price: Number,
  is_available: { type: Boolean, default: true },
  prep_time: Number,
});

menuItemSchema.index({ category_id: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);
