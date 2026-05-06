const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    address_snapshot: { type: Object },
    total_amount: Number,
    status: {
      type: String,
      enum: ["placed", "preparing", "out_for_delivery", "delivered"],
      default: "placed",
    },
    payment_status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
);

orderSchema.index({ user_id: 1 });
orderSchema.index({ restaurant_id: 1 });

module.exports = mongoose.model("Order", orderSchema);
