const jwt = require("jsonwebtoken");
const config = require("config");

// 🔹 Foydalanuvchini tekshirish (login qilinganmi yoki yo'q)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi" });
  }

  jwt.verify(token, config.get("access_key"), (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token yaroqsiz" });
    }
    req.user = user; // { id, role }
    next();
  });
};

module.exports = authMiddleware;
