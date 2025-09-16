const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Food = require("./foods.model");
const Order = require("./orders.model");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "food",
        key: "id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "order",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "order_item",
    timestamps: false,
  }
);

// Bog‘lanishlar
OrderItem.belongsTo(Food, { foreignKey: "food_id", as: "food" });
Food.hasMany(OrderItem, { foreignKey: "food_id", as: "orderItems" });

OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });

module.exports = OrderItem;
