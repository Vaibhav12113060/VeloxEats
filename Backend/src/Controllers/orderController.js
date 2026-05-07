const { Order, OrderItem, CartItem, User, Address } = require("../Models");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.body;

    // 1. Get user's cart items
    const cartItems = await CartItem.find({ user: userId }).populate({
      path: "menuItem",
      select: "price restaurant",
    });

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Your cart is empty." });
    }

    // 2. Get address and create snapshot
    const address = await Address.findById(addressId);
    if (!address || address.user_id.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid address selected.",
      });
    }
    const address_snapshot = {
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
    };

    // 3. Calculate total amount and get restaurant ID
    let total_amount = 0;
    const restaurantId = cartItems[0].menuItem.restaurant;
    const orderItemsData = cartItems.map((item) => {
      const itemPrice = item.menuItem.price * item.quantity;
      total_amount += itemPrice;
      return {
        menuItem: item.menuItem._id,
        quantity: item.quantity,
        price_at_time: item.menuItem.price,
      };
    });

    // 4. Create the order
    const order = await Order.create({
      user: userId,
      restaurant: restaurantId,
      address_snapshot,
      total_amount,
      payment_status: "pending", // Assuming payment is handled next
    });

    // 5. Create order items and associate with the order
    const finalOrderItems = orderItemsData.map((item) => ({
      ...item,
      order: order._id,
    }));
    await OrderItem.insertMany(finalOrderItems);

    // 6. Clear the user's cart
    await CartItem.deleteMany({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("restaurant", "name image")
      .sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name location")
      .populate({
        path: "orderItems",
        populate: {
          path: "menuItem",
          select: "name image",
        },
      });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Security check: user can only see their own order, admin/staff can see orders related to them
    const isOwner = order.user._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    // Add more role checks if needed

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to view this order" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// For Admins
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .populate("restaurant", "name")
      .sort({ created_at: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// For Chefs/Restaurant Owners
exports.getRestaurantOrders = async (req, res) => {
  try {
    // We can also get restaurant from logged in chef's profile in future
    const orders = await Order.find({ restaurant: req.params.restaurantId })
      .populate("user", "name")
      .sort({ created_at: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // TODO: Add logic to notify user about status change via websockets or push notifications

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
