const User = require("../models/user.model");

// Create (foydalanuvchi qo‘shish)
exports.createUser = async (req, res) => {
  try {
    const { name, phone, email, password, address, role } = req.body;
    const user = await User.create({
      name,
      phone,
      email,
      password, // aslida bcrypt bilan hash qilish kerak
      address,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (hammasini olish)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (bitta foydalanuvchini olish)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User topilmadi" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, email, password, address, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: "User topilmadi" });

    await user.update({
      name,
      phone,
      email,
      password,
      address,
      role,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User topilmadi" });

    await user.destroy();
    res.json({ message: "User o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
