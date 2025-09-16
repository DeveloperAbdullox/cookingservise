// middlewares/validateRestaurant.js
const Joi = require("joi");

// Restaurant yaratish uchun schema
const createRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(255).required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(9).max(15).required(),
  delivery_available: Joi.boolean().optional(),
  owner_id: Joi.number().integer().required() // owner_id shart
});

// Middleware funksiyasi
const validateCreateRestaurant = (req, res, next) => {
  const { error } = createRestaurantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateCreateRestaurant;
