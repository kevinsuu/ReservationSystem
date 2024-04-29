// database/connection.js
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "postgres", "password", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
