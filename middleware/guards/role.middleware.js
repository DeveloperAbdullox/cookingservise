// 🔹 Role bo'yicha tekshirish
const roleMiddleware = (roles = []) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Sizga ruxsat yo'q" });
      }
      next();
    };
  };
  
module.exports = roleMiddleware;
  