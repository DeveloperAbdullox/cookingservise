const express = require("express");
const { createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory
} = require("../controllers/category.controller.js");
const validateCategory = require("../middleware/joi/validate.category.js");


const router = express.Router();

// Create
router.post("/", validateCategory, createCategory);

// Read (hammasini olish)
router.get("/", getCategories);

// Read (bitta kategoriyani olish)
router.get("/:id", getCategoryById);

// Update
router.put("/:id", updateCategory);

// Delete
router.delete("/:id", deleteCategory);

module.exports = router;
