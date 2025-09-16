// middlewares/validateOrder.js
const Joi = require("joi");

// Order yaratish uchun schema
const createOrderSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  restaurant_id: Joi.number().integer().positive().required(),
  status: Joi.string()
    .valid("pending", "confirmed", "delivered", "cancelled")
    .default("pending"),
  total_price: Joi.number().precision(2).min(0).default(0.0),
});

// Middleware funksiyasi
const validateCreateOrder = (req, res, next) => {
  const { error, value } = createOrderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value; // default qiymatlarni qo‘llash
  next();
};

module.exports = validateCreateOrder;
