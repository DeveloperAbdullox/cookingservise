// middlewares/validateFood.js
const Joi = require("joi");

// Food yaratish uchun schema
const createFoodSchema = Joi.object({
    // id: Joi.number().integer()
  restaurant_id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().positive().required(),
  img: Joi.string().uri().optional(), // rasm URL bo‘lsa tekshiradi
  category_id: Joi.number().integer().required()
});

// Middleware funksiyasi
const validateCreateFood = (req, res, next) => {
  const { error } = createFoodSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateCreateFood;
