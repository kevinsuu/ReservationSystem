"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "locations",
      [
        {
          name: "羽球場 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "羽球場 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "羽球場 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("locations", {});
  },
};
