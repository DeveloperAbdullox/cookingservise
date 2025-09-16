const Category = require("../models/category.model");

// Create (yangi kategoriya qo‘shish)
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({ name, description });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (hammasini olish)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (bitta kategoriyani olish)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update (kategoriya yangilash)
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

    await category.update({ name, description });

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete (kategoriya o‘chirish)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

    await category.destroy();
    res.json({ message: "Kategoriya o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
