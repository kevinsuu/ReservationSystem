// models/User.js

const DataTypes = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("user", {
  // 定義 user 資料表的字段
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
