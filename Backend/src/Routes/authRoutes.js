const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  updatePassword,
  deleteUser,
  updateUserRoleByAdmin,
  getUserByRole,
} = require("../Controllers/authControllers");

const { protect, adminOnly } = require("../Middlewares/authMiddleware");

// ================= AUTH ROUTES =================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Logout User
router.post("/logout", protect, logout);

// ================= USER ROUTES =================

// Get Logged In User Profile
router.get("/profile", protect, getUserProfile);

// Update User Profile
router.put("/profile/update", protect, updateUserProfile);

// Update Password
router.put("/password/update", protect, updatePassword);

// ================= ADMIN ROUTES =================

// Get All Users
router.get("/users", protect, adminOnly, getAllUsers);

// Get Single User
router.get("/user/:id", protect, adminOnly, getSingleUser);

// Get Users by Role

router.get("/users/role/:role", protect, adminOnly, getUserByRole);

// Update User Role
router.put("/user/:id/role", protect, adminOnly, updateUserRoleByAdmin);

// Delete User
router.delete("/user/:id", protect, adminOnly, deleteUser);

module.exports = router;
