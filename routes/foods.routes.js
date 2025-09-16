const express = require("express")
const {
    createFood, 
    getFoods, 
    getFoodById, 
    updateFood, 
    deleteFood
} = require("../controllers/foods.controller.js")
const validateFood = require("../middleware/joi/validate.foods.js");


const router = express.Router()

router.post("/", validateFood, createFood)

router.get("/", getFoods)

router.get("/:id", getFoodById)

router.put("/:id", updateFood)

router.delete("/:id", deleteFood)

module.exports = router;