"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: "john_doe",
        email: "john_doe@gmail.com",
        password: "password123",
        rolesId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "admin",
        email: "john_doe@gmail.com",
        password: "admin",
        rolesId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "kevin",
        email: "kevin@gmail.com",
        password: "123",
        rolesId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // 對每個用戶的密碼進行哈希處理
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
