const express = require("express");
const {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItem.controller.js");
const validateOrderItem = require("../middleware/joi/validate.orderItem.js");


const router = express.Router();

// Create
router.post("/", validateOrderItem, createOrderItem);

// Read all
router.get("/", getOrderItems);

// Read one
router.get("/:id", getOrderItemById);

// Update
router.put("/:id", validateOrderItem, updateOrderItem);

// Delete
router.delete("/:id", deleteOrderItem);

module.exports = router;
