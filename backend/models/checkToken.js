const jwt = require('jsonwebtoken');
const sequelize = require('../database/connection'); // 引入 Sequelize 实例

const checkToken = async (token) => {
  try {
    const decoded = jwt.verify(token, 'kevin');
    const result = await sequelize.query(
      `SELECT * FROM "loginLists" WHERE "email" = :email`,
      {
        replacements: {
          email: decoded.email,
        },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    const latestToken = result[0].token;
    if (latestToken !== token) {
      return false; // Token 不是最新的
    }
    return true; // Token 是最新的
  } catch (error) {
    return false; // Token 無效
  }
};

module.exports = checkToken;
