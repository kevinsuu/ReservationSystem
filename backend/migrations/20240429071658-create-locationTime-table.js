// time migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("locationTimes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      timesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      locationsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("locationTimes");
  },
};
