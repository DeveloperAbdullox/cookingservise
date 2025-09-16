const express = require("express")

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurants.controller.js")
const validateRestaurant = require("../middleware/joi/validate.restaurant.js");


const router = express.Router()

router.post("/", validateRestaurant, createRestaurant)

router.get("/", getRestaurants)

router.get("/:id", getRestaurantById)

router.put("/:id", updateRestaurant)

router.delete("/:id", deleteRestaurant)

module.exports = router;