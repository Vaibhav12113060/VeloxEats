const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getNearbyRestaurants,
  getMyRestaurant,
} = require("../Controllers/restaurantController");

const { protect, restaurantOnly } = require("../Middlewares/authMiddleware");
const { upload } = require("../Config/cloudinary");

router.post(
  "/create",
  protect,
  restaurantOnly,
  upload.single("image"),
  createRestaurant,
);
router.get("/", getAllRestaurants);

// Get My Restaurant
router.get("/my-restaurant", protect, restaurantOnly, getMyRestaurant);
// Nearby Restaurants
router.get("/nearby", getNearbyRestaurants);
router.get("/:id", getSingleRestaurant);
router.put(
  "/:id",
  protect,
  restaurantOnly,
  upload.single("image"),
  updateRestaurant,
);
router.delete("/:id", protect, restaurantOnly, deleteRestaurant);

module.exports = router;
