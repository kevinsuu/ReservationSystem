const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 從數據庫中查找使用者
    const user = await User.findOne({ where: { username } });

    // 如果找不到使用者，返回錯誤
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 檢查密碼是否匹配
    console.log(password, user.password);
    const passwordMatch = await bcrypt.compare(password, user.password);

    // 如果密碼不匹配，返回錯誤

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 如果密碼匹配，建立 JWT
    const token = jwt.sign({ username: user.username }, "kevin", { expiresIn: "1h" });

    // 將 JWT 傳送回客戶端
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 使用 Sequelize 的 create 方法來創建新的使用者帳戶
    await User.create({ username, password });
    res.send("User registered successfully");
  } catch (err) {
    // 如果創建過程中出現錯誤，返回錯誤信息
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
};
