const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  price: Number,
  image: { type: String },
  is_available: { type: Boolean, default: true },
  prep_time: Number,
});

menuItemSchema.index({ category: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);
