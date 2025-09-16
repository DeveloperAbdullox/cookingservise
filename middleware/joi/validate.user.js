// middlewares/validateUser.js
const Joi = require("joi");

// User yaratish uchun schema
const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(9).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().max(255).optional(),
  role: Joi.string().valid("owner", "user", "admin", "delivery").optional()
});

// Middleware funksiyasi
const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateCreateUser;
