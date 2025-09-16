const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // db.js dan connection import

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("owner", "user", "admin", "delivery"),
    allowNull: false,
    defaultValue: "user",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "user",
  timestamps: false, // agar updatedAt kerak bo‘lmasa
});

module.exports = User;
