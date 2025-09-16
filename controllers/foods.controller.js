const Food = require("../models/foods.model");
const Restaurant = require("../models/restaurant.model");
const Category = require("../models/category.model");

// Create (yangi ovqat qo‘shish)
exports.createFood = async (req, res) => {
  try {
    const { restaurant_id, name, price, img, category_id } = req.body;

    const food = await Food.create({
      restaurant_id,
      name,
      price,
      img,
      category_id,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (hammasini olish)
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.findAll({
      include: [
        { model: Restaurant, as: "restaurant", attributes: ["id", "name"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (bitta ovqat olish)
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id, {
      include: [
        { model: Restaurant, as: "restaurant", attributes: ["id", "name"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });

    if (!food) return res.status(404).json({ message: "Ovqat topilmadi" });

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update (ovqatni yangilash)
exports.updateFood = async (req, res) => {
  try {

    // console.log("Params:", req.params);
    // console.log("Query:", req.query);

    const { name, price, img, category_id } = req.body;

    const food = await Food.findByPk(req.params.id);
    // console.log("food",food)
    if (!food) return res.status(404).json({ message: "Ovqat topilmadi" });

    await food.update({ name, price, img, category_id });

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete (ovqatni o‘chirish)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ message: "Ovqat topilmadi" });

    await food.destroy();
    res.json({ message: "Ovqat o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
