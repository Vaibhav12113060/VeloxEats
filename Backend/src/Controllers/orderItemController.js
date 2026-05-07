const { OrderItem } = require("../Models");

exports.createOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.create(req.body);

    res.status(201).json({
      success: true,
      orderItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderItemsByOrder = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({
      order: req.params.orderId,
    }).populate("menuItem");

    res.status(200).json({
      success: true,
      orderItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    await OrderItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
