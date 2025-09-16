const OrderItem = require("../models/orderItem.model");
const Food = require("../models/foods.model");
const Order = require("../models/orders.model");

exports.createOrderItem = async (req, res) => {
  try {
    const { food_id, order_id, quantity } = req.body;

    const newItem = await OrderItem.create({
      food_id,
      order_id,
      quantity,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (hamma order itemlarni olish)
exports.getOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll({
      include: [
        { model: Food, as: "food" },
        { model: Order, as: "order" },
      ],
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (bitta order itemni olish)
exports.getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, {
      include: [
        { model: Food, as: "food" },
        { model: Order, as: "order" },
      ],
    });

    if (!item) return res.status(404).json({ error: "OrderItem topilmadi" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateOrderItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const item = await OrderItem.findByPk(req.params.id);

    if (!item) return res.status(404).json({ error: "OrderItem topilmadi" });

    item.quantity = quantity ?? item.quantity;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);

    if (!item) return res.status(404).json({ error: "OrderItem topilmadi" });

    await item.destroy();

    res.status(200).json({ message: "OrderItem o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
