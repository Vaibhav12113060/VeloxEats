const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    delivery_agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address_snapshot: { type: Object },
    total_amount: Number,
    status: {
      type: String,
      enum: [
        "placed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    payment_status: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

orderSchema.virtual("orderItems", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "order",
});

orderSchema.index({ user: 1 });
orderSchema.index({ restaurant: 1 });

module.exports = mongoose.model("Order", orderSchema);
