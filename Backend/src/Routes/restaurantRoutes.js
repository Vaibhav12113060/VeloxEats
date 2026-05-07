const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../Controllers/restaurantController");

const { protect, adminOnly } = require("../Middlewares/authMiddleware");
const { upload } = require("../Config/cloudinary");

router.post(
  "/create",
  protect,
  adminOnly,
  upload.single("image"),
  createRestaurant,
);
router.get("/", getAllRestaurants);
router.get("/:id", getSingleRestaurant);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateRestaurant,
);
router.delete("/:id", protect, adminOnly, deleteRestaurant);

module.exports = router;
