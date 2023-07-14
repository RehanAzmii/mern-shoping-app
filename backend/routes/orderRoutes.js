const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/orderController");

const router = new express.Router();

// create new order

router.route("/").post(protect, addOrderItem);

// get order by id
router.route("/:id").get(protect, getOrderById);
// update order
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
