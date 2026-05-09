const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItemsByRestaurant,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../Controllers/menuItemController");

const { protect, restaurantOnly } = require("../Middlewares/authMiddleware");
const { upload } = require("../Config/cloudinary");

// Admin/Chef can create, update, delete menu items
router.post(
  "/create",
  protect,
  restaurantOnly,
  upload.single("image"),
  createMenuItem,
);
router
  .route("/:id")
  .get(getMenuItemById)
  .put(protect, restaurantOnly, upload.single("image"), updateMenuItem)
  .delete(protect, restaurantOnly, deleteMenuItem);

router.get("/restaurant/:restaurantId", getMenuItemsByRestaurant);

module.exports = router;
