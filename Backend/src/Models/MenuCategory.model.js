const mongoose = require("mongoose");

const menuCategorySchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
