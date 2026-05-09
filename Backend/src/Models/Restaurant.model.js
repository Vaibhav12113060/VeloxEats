const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    // Restaurant Owner
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    // User readable city/location
    location_name: {
      type: String,
      required: true,
    },

    // GeoJSON
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },

    rating: {
      type: Number,
      default: 0,
    },

    is_open: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// ONLY create index if coordinates exist
restaurantSchema.index(
  { location: "2dsphere" },
  {
    sparse: true,
  },
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
