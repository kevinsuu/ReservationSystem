const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.info = (req, res) => {
  res.json({ message: 'Get info successfully' });
};

exports.register = async (req, res) => {
  console.log('====req.body', req.body);

  const { name, password, email, rolesId } = req.body;

  try {
    // 使用 Sequelize 的 create 方法來創建新的使用者帳戶
    const hashedPassword = await bcrypt.hash(password.toString(), 10); // 將密碼哈希處理
    await User.create({ name, password: hashedPassword, email, rolesId }); // 將哈希處理後的密碼存入資料庫

    res.status(201).json({ message: 'User registered successfully' }); // 改為 201 狀態碼
  } catch (err) {
    // 如果創建過程中出現錯誤，返回錯誤信息
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};
