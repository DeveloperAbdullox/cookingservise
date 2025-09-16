// middlewares/validateOrderItem.js
const Joi = require("joi");

// OrderItem yaratish uchun schema
const createOrderItemSchema = Joi.object({
  food_id: Joi.number().integer().positive().required(),
  order_id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().default(1)
});

// Middleware funksiyasi
const validateCreateOrderItem = (req, res, next) => {
  const { error, value } = createOrderItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value; // default qiymatlarni qo‘llash
  next();
};

module.exports = validateCreateOrderItem;
