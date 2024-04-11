const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.info = (req, res) => {
  res.send("Get info successfully");
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 使用 Sequelize 的 create 方法來創建新的使用者帳戶
    const hashedPassword = await bcrypt.hash(password.toString(), 10); // 將密碼哈希處理
    await User.create({ username, password: hashedPassword }); // 將哈希處理後的密碼存入資料庫

    res.send("User registered successfully");
  } catch (err) {
    // 如果創建過程中出現錯誤，返回錯誤信息
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
};
