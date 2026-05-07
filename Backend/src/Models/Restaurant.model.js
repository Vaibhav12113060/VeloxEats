const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  location: String,
  lat: Number,
  lon: Number,
  rating: { type: Number, default: 0 },
  is_open: { type: Boolean, default: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
