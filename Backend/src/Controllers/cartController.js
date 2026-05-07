const { CartItem, MenuItem } = require("../Models");

exports.getMyCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id }).populate({
      path: "menuItem",
      select: "name price image restaurant",
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty.",
        cart: [],
      });
    }

    res.status(200).json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addItemToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Check if user has items from another restaurant
    const existingCartItem = await CartItem.findOne({ user: userId });
    if (existingCartItem) {
      await existingCartItem.populate("menuItem");
      if (
        existingCartItem.menuItem.restaurant.toString() !==
        menuItem.restaurant.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You can only order from one restaurant at a time. Please clear your cart to add items from this restaurant.",
        });
      }
    }

    let cartItem = await CartItem.findOne({
      user: userId,
      menuItem: menuItemId,
    });

    if (cartItem) {
      // If item exists, update quantity
      cartItem.quantity += parseInt(quantity, 10) || 1;
    } else {
      // If item does not exist, create new cart item
      cartItem = new CartItem({
        user: userId,
        menuItem: menuItemId,
        quantity: parseInt(quantity, 10) || 1,
      });
    }

    await cartItem.save();
    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const cartItem = await CartItem.findOneAndUpdate(
      { _id: itemId, user: req.user.id },
      { quantity },
      { new: true },
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: itemId,
      user: req.user.id,
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({ user: req.user.id });
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
