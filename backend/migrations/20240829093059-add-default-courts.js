'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 插入預設資料
    await queryInterface.bulkInsert(
      'courts',
      [
        {
          name: '羽球場 1',
          location: '羽球館 A 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 2',
          location: '羽球館 A 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 3',
          location: '羽球館 A 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 4',
          location: '羽球館 A 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 5',
          location: '羽球館 B 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 6',
          location: '羽球館 B 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 7',
          location: '羽球館 B 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '羽球場 8',
          location: '羽球館 B 棟',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    // 刪除預設資料
    await queryInterface.bulkDelete('courts', null, {});
  },
};
