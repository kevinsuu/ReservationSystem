// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 從請求中獲取 token
  const token = req.headers.authorization;

  // 如果沒有 token，返回未授權錯誤
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 驗證 token
    const decoded = jwt.verify(token, "kevin");
    // 將解碼後的用戶信息放入請求中
    req.user = decoded;
    // 繼續下一個 middleware 或路由處理程序
    next();
  } catch (error) {
    // 如果 token 無效，返回錯誤
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
