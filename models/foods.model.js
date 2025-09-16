const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./restaurant.model");
const Category = require("./category.model");

const Food = sequelize.define(
  "Food",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurant", // restaurant table nomi
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING, // rasm URL yoki path
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // category table nomi
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "food",
    timestamps: false, // createdAt/updatedAt avtomatik bo‘lmasin
  }
);

// Bog‘lanishlar
Food.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });
Restaurant.hasMany(Food, { foreignKey: "restaurant_id", as: "foods" });

Food.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Food, { foreignKey: "category_id", as: "foods" });

module.exports = Food;
