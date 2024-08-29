const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('../database/connection'); // 引入 Sequelize 实例

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 從數據庫中查找使用者
    const user = await User.findOne({ where: { email } });

    // 如果找不到使用者，返回錯誤
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 檢查密碼是否匹配
    console.log(password, user.password);
    const passwordMatch = await bcrypt.compare(password, user.password);

    // 如果密碼不匹配，返回錯誤

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // 如果密碼匹配，建立 JWT
    const token = jwt.sign({ email: user.email }, 'kevin', { expiresIn: '1h' });
    await sequelize.query(
      `INSERT INTO "loginLists" ("email", "token", "createdAt", "updatedAt") 
       VALUES (:email, :token, :createdAt, :updatedAt)
       ON CONFLICT ("email") DO UPDATE SET "token" = :token`,
      {
        replacements: {
          email: user.email,
          token,
          createdAt: new Date(), // Provide current date/time
          updatedAt: new Date(), // Provide current date/time
        },
        type: sequelize.QueryTypes.INSERT,
      },
    );

    // 將 JWT 傳送回客戶端
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { name, email, newPassword } = req.body;
  console.log(name, email, newPassword);
  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const user = await User.findOne({ where: { name, email } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    // 如果過程中出現錯誤，返回錯誤信息
    console.error('Error resetting password:', err);
    res.status(500).send('Error resetting password');
  }
};
