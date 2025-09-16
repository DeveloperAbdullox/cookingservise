// middlewares/validateDelivery.js
const Joi = require("joi");

// Delivery yaratish uchun schema
const createDeliverySchema = Joi.object({
  order_id: Joi.number().integer().positive().required(),
  courier_id: Joi.number().integer().positive().required(),
  status: Joi.string().valid("pending", "assigned", "delivered", "canceled").default("pending"),
  assigned_at: Joi.date().allow(null),
  delivery_at: Joi.date().allow(null),
});

// Middleware funksiyasi
const validateCreateDelivery = (req, res, next) => {
  const { error, value } = createDeliverySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value; // default qiymatlarni qo‘llash
  next();
};

module.exports = validateCreateDelivery;
