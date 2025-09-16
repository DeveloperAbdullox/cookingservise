const Restaurant = require("../models/restaurant.model");
const User = require("../models/user.model"); // owner bilan bog‘lash uchun kerak

// Create
exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, phone, delivery_available, owner_id } = req.body;

    // owner_id ni req.user.id dan olish mumkin (agar auth ishlayotgan bo‘lsa)
    const restaurant = await Restaurant.create({
      name,
      address,
      phone,
      delivery_available,
      owner_id,  //: req.user ? req.user.id : null,
    });

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (hammasini olish)
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: User, as: "owner", attributes: ["id", "name", "email"] }],
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (bitta restoran olish)
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [{ model: User, as: "owner", attributes: ["id", "name", "email"] }],
    });
    if (!restaurant) return res.status(404).json({ message: "Restoran topilmadi" });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateRestaurant = async (req, res) => {
  try {
    const { name, address, phone, delivery_available } = req.body;
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (!restaurant) return res.status(404).json({ message: "Restoran topilmadi" });

    await restaurant.update({
      name,
      address,
      phone,
      delivery_available,
    });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restoran topilmadi" });

    await restaurant.destroy();
    res.json({ message: "Restoran o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
