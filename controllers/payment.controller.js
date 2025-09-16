const Payment = require("../models/payments.model.js");

// Create
exports.createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_method, status } = req.body;
    const payment = await Payment.create({ order_id, amount, payment_method, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Read All
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Read by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "To'lov topilmadi" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Update
exports.updatePayment = async (req, res) => {
  try {
    const { order_id, amount, payment_method, status } = req.body;
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "To'lov topilmadi" });

    payment.order_id = order_id ?? payment.order_id;
    payment.amount = amount ?? payment.amount;
    payment.payment_method = payment_method ?? payment.payment_method;
    payment.status = status ?? payment.status;

    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

// Delete
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "To'lov topilmadi" });

    await payment.destroy();
    res.status(200).json({ message: "To'lov o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};
