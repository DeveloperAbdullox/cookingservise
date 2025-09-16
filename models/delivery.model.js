const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // DB bilan bog'langan fayl

const Delivery = sequelize.define("Delivery", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'order', key: 'id' } // agar Orders modeli bo'lsa
  },
  courier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: { model: 'Couriers', key: 'id' } // agar Couriers modeli bo'lsa
  },
  status: {
    type: DataTypes.ENUM("pending", "assigned", "delivered", "canceled"),
    defaultValue: "pending",
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  delivery_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  tableName: "deliveries",
  timestamps: false,
});

module.exports = Delivery;
