// middlewares/validateCategory.js
const Joi = require("joi");

// Category yaratish uchun schema
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional() // description optional, lekin max uzunligi 500
});

// Middleware funksiyasi
const validateCreateCategory = (req, res, next) => {
  const { error } = createCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateCreateCategory;
