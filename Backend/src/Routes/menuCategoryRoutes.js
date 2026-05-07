const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
} = require("../Controllers/menuCategoryController");

const { protect, adminOnly } = require("../Middlewares/authMiddleware");

router.post("/create", protect, adminOnly, createCategory);
router.get("/", getAllCategories);

module.exports = router;
