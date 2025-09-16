// middlewares/validatePayment.js
const Joi = require("joi");

// Payment yaratish uchun schema
const createPaymentSchema = Joi.object({
  order_id: Joi.number().integer().positive().required(),
  amount: Joi.number().precision(2).min(0.01).required(),
  payment_method: Joi.string().valid("card", "cash", "paypal").required(),
  status: Joi.string().valid("pending", "completed", "failed").default("pending"),
});

// Middleware funksiyasi
const validateCreatePayment = (req, res, next) => {
  const { error, value } = createPaymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value; // default qiymatlarni qo‘llash
  next();
};

module.exports = validateCreatePayment;
