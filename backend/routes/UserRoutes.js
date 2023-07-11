const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
} = require("../controllers/usersController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//user registration
router.route("/").post(registerUser);

// AUTH || POST
router.route("/login").post(authController);

//get user Profile private routes
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
