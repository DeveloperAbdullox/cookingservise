const Order = require("../models/orders.model");

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const { user_id, restaurant_id, status, total_price } = req.body;

    const order = await Order.create({
      user_id,
      restaurant_id,
      status,
      total_price,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: ["user", "restaurant"], // bog‘lanishlarni chiqarish
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ["user", "restaurant"],
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const { status, total_price } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status || order.status;
    order.total_price = total_price || order.total_price;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.destroy();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
