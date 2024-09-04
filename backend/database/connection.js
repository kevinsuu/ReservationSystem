// database/connection.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('reservation_system', 'postgres', 'password', {
  dialect: 'postgres',
  // host: "localhost",
  host: 'postgres',
  // logging: false // 禁止日誌輸出、
});

module.exports = sequelize;
