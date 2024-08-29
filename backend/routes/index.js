// routes/index.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/register');
const user = require('../controllers/user');
const profile = require('../controllers/profile');

const authMiddleware = require('../middleware/authMiddleware');

// 對所有 API 驗證帳號

// 定義路由
router.post('/api/auth/login', user.login);
router.post('/api/auth/reset', user.resetPassword);
router.post('/api/auth/register', controller.register);

router.use(authMiddleware);

router.get('/api/info', controller.info);
router.get('/api/auth/profile', profile.profileInfo);
router.put('/api/auth/profile', profile.profileUpdate);
// 用戶管理 API：
// POST /api/auth/register: 註冊新用戶。
// POST /api/auth/login: 用戶登入。
// GET /api/auth/profile: 查看用戶個人資料。
// PUT /api/auth/profile: 更新用戶個人資料。
// 球場管理 API：
// GET /api/courts: 查看所有可用球場。
// 預約管理 API：
// POST /api/reservations: 創建新預約。
// GET /api/reservations: 查看用戶的所有預約。
// DELETE /api/reservations/:id: 取消預約。

module.exports = router;
