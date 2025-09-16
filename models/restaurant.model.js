const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // db.js faylingni chaqiryapmiz
const User = require("./user.model"); // owner_id foreign key bo‘lishi uchun

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // user.model.js da table nomi
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "restaurant",
    timestamps: false, // createdAt/updatedAt avtomatik bo‘lmasin
  }
);

// User bilan bog‘lash (1 owner ko‘p restoran ochishi mumkin)
Restaurant.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
User.hasMany(Restaurant, { foreignKey: "owner_id", as: "restaurants" });

module.exports = Restaurant;
