const express = require("express");
const {
    createPayment, 
    getAllPayments, 
    getPaymentById, 
    updatePayment, 
    deletePayment
} = require("../controllers/payment.controller.js");
const validatePayment = require("../middleware/joi/validate.payment.js");


const router = express.Router();

// Create (Yangi to'lov qo'shish)
router.post("/", validatePayment, createPayment);

// Read (Barcha to'lovlarni olish)
router.get("/", getAllPayments);

// Read (ID bo'yicha olish)
router.get("/:id", getPaymentById);

// Update (ID bo'yicha yangilash)
router.put("/:id", updatePayment);

// Delete (ID bo'yicha o'chirish)
router.delete("/:id", deletePayment);

module.exports = router;
