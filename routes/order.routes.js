const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller.js");
const validateOrder = require("../middleware/joi/validate.order.js");


const router = express.Router();

// Create
router.post("/", validateOrder, createOrder);

// Read all
router.get("/", getOrders);

// Read by id
router.get("/:id", getOrderById);

// Update
router.put("/:id", updateOrder);

// Delete
router.delete("/:id", deleteOrder);

module.exports = router;
