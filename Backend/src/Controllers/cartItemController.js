const { CartItem } = require("../Models");

exports.createCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
