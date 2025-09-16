const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Restaurant = require("./restaurant.model");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // user jadvali
        key: "id",
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurant", // restaurant jadvali
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "order",
    timestamps: false,
  }
);

// Bog‘lanishlar
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Order, { foreignKey: "user_id", as: "orders" });

Order.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });
Restaurant.hasMany(Order, { foreignKey: "restaurant_id", as: "orders" });

module.exports = Order;
