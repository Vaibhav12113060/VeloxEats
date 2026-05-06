const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  street: String,
  city: String,
  state: String,
  lat: Number,
  lon: Number,
});

module.exports = mongoose.model("Address", addressSchema);
