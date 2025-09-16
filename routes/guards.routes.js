const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { AdminGuard, OwnerGuard, ClientGuard, CreatorGuard, SelfGuard } = require("../middlewares/guards.js");

// 🔹 Faqat admin kira oladigan route
router.get("/admin-only", authMiddleware, AdminGuard, (req, res) => {
  res.send("Bu admin uchun sahifa");
});

// 🔹 Faqat owner kira oladigan route
router.get("/owner-only", authMiddleware, OwnerGuard, (req, res) => {
  res.send("Bu owner uchun sahifa");
});

// 🔹 Faqat client kira oladigan route
router.get("/client-only", authMiddleware, ClientGuard, (req, res) => {
  res.send("Bu client uchun sahifa");
});

// 🔹 Foydalanuvchi o‘z profilini ko‘rishi yoki admin
router.get("/users/:id", authMiddleware, SelfGuard, (req, res) => {
  res.send(`Bu foydalanuvchi ID: ${req.params.id}`);
});

// 🔹 CreatorGuard misoli (masalan, postni yaratuvchi)
router.delete(
  "/posts/:id",
  authMiddleware,
  CreatorGuard(async (req) => {
    // Masalan, DB dan postni olib kelamiz
    const post = await Post.findByPk(req.params.id);
    return post.user_id; // post egasi kim?
  }),
  (req, res) => {
    res.send("Post o‘chirildi");
  }
);

module.exports = router;
