const express = require("express");
const {
  addAddress,
  getMyAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../Controllers/addressController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

// All routes here are protected
router.use(protect);

router.route("/add").post(addAddress);
router.route("/my").get(getMyAddresses);
router
  .route("/:id")
  .get(getAddressById)
  .put(updateAddress)
  .delete(deleteAddress);
router.route("/default/:id").patch(setDefaultAddress);

module.exports = router;
