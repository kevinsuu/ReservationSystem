// routes/index.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/register");
const user = require("../controllers/user");

const authMiddleware = require("../middleware/authMiddleware");

// 對所有 API 驗證帳號

// 定義路由
router.post("/api/login", user.login);
router.post("/api/register", controller.register);

router.use(authMiddleware);

router.get("/api/info", controller.info);

module.exports = router;
