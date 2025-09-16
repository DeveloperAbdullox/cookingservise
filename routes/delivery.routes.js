const express = require("express");
const {createDelivery,
    getAllDeliveries, 
    getDeliveryById, 
    updateDelivery,
    deleteDelivery
} = require("../controllers/delivery.controller.js");
const validateDelivery = require("../middleware/joi/validate.delivery.js")


const router = express.Router();

// Create
router.post("/", validateDelivery, createDelivery);

// Read All
router.get("/", getAllDeliveries);

// Read by ID
router.get("/:id", getDeliveryById);

// Update
router.put("/:id", updateDelivery);

// Delete
router.delete("/:id", deleteDelivery);

module.exports = router;
