
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // DB bilan bog'langan fayl
const Order = require("./orders.model.js"); // shu joyni qo‘shish kerak


const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Agar Order modeli mavjud bo'lsa, foreign key qilishingiz mumkin
    // references: {
    //   model: 'orders',
    //   key: 'id'
    // }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "payment",
  timestamps: true, // agar createdAt/updatedAt avtomatik kerak bo'lsa true qiling
});

Payment.belongsTo(Order, { foreignKey: "order_id", as: "order" });
Order.hasMany(Payment, { foreignKey: "order_id", as: "payments" });

module.exports = Payment;
