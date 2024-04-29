module.exports = {
  up: async (queryInterface, Sequelize) => {
    const times = [];

    for (let i = 8; i <= 22; i++) {
      // 從早上 8:00 到晚上 22:00
      const startHour = i < 10 ? `0${i}` : `${i}`; // 保證兩位數
      const endHour = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`; // 下一個小時
      const interval = `${startHour}:00 - ${endHour}:00`;

      times.push({
        interval,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("times", times, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("times", null, {});
  },
};
