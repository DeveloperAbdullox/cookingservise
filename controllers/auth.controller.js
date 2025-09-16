const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const config = require("config");

// Token generatsiya qilish funksiyasi
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    config.get("access_key"),
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    config.get("refresh_key"),
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// 🔹 Register (owner, admin, user uchun)
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!["owner", "admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Noto‘g‘ri role kiritildi" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `${role} ro‘yxatdan o‘tdi`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Login (hamma rol uchun)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Parol noto‘g‘ri" });

    const tokens = generateTokens(user);

    res.json({
      message: `${user.role} login qilindi`,
      user: { id: user.id, name: user.name, role: user.role },
      ...tokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Refresh Token
exports.refresh = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    jwt.verify(token, config.get("refresh_key"), (err, user) => {
      if (err) return res.status(403).json({ message: "Yaroqsiz token" });

      const tokens = generateTokens(user);
      res.json(tokens);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Logout
exports.logout = async (req, res) => {
  try {
    // Agar refresh token DBda saqlansa, shu yerda o‘chirib tashlash kerak bo‘ladi
    res.json({ message: "Logout qilindi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
