const Delivery = require("../models/delivery.model");

// Create
exports.createDelivery = async (req, res) => {
  try {
    const { order_id, courier_id, status, assigned_at, delivery_at } = req.body;
    const delivery = await Delivery.create({ order_id, courier_id, status, assigned_at, delivery_at });
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Read All
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Read by ID
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery topilmadi" });
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Update
exports.updateDelivery = async (req, res) => {
  try {
    const { order_id, courier_id, status, assigned_at, delivery_at } = req.body;
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery topilmadi" });

    delivery.order_id = order_id ?? delivery.order_id;
    delivery.courier_id = courier_id ?? delivery.courier_id;
    delivery.status = status ?? delivery.status;
    delivery.assigned_at = assigned_at ?? delivery.assigned_at;
    delivery.delivery_at = delivery_at ?? delivery.delivery_at;

    await delivery.save();
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Delete
exports.deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery topilmadi" });

    await delivery.destroy();
    res.status(200).json({ message: "Delivery o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};
