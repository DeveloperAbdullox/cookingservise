// guards.js
// Barcha guardlarni shu faylga joylab chiqamiz

// 🔹 AdminGuard
const AdminGuard = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Faqat admin uchun ruxsat" });
    }
    next();
  };
  
  // 🔹 OwnerGuard
  const OwnerGuard = (req, res, next) => {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Faqat owner uchun ruxsat" });
    }
    next();
  };
  
  // 🔹 ClientGuard
  const ClientGuard = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Faqat client uchun ruxsat" });
    }
    next();
  };
  
  // 🔹 CreatorGuard (resurs yaratgan user)
  const CreatorGuard = (getResourceUserId) => {
    return async (req, res, next) => {
      try {
        const resourceUserId = await getResourceUserId(req); 
        if (req.user.id !== resourceUserId && req.user.role !== "admin") {
          return res.status(403).json({ message: "Faqat yaratuvchi yoki admin kira oladi" });
        }
        next();
      } catch (err) {
        return res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
      }
    };
  };
  
  // 🔹 SelfGuard (o‘z profilini tahrir qilish/kirish)
  const SelfGuard = (req, res, next) => {
    const userId = parseInt(req.params.id); // URL’dan id olish: /users/:id
    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Faqat o‘z profilingiz yoki admin uchun ruxsat" });
    }
    next();
};
  
module.exports = {
    AdminGuard,
    OwnerGuard,
    ClientGuard,
    CreatorGuard,
    SelfGuard,
  };
  