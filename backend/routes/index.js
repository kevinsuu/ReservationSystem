// routes/index.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/register');
const user = require('../controllers/user');
const profile = require('../controllers/profile');
const reservations = require('../controllers/reservations');

const authMiddleware = require('../middleware/authMiddleware');

// 對所有 API 驗證帳號

// 定義路由
// 用戶管理 API：
// POST auth/register: 註冊新用戶。
// POST auth/login: 用戶登入。
// GET auth/profile: 查看用戶個人資料。
// PUT auth/profile: 更新用戶個人資料。
// 球場管理 API：
// GET reservations/courts: 查看所有可用球場。
// 預約管理 API：
// POST reservations/create: 創建新預約。
// GET reservations/search': 查看用戶的所有預約。
// DELETE reservations/cancel/:id: 取消預約。
// 球場最新消息
//

router.post('auth/login', user.login);
router.post('auth/reset', user.resetPassword);
router.post('auth/register', controller.register);

router.use(authMiddleware);

router.get('info', controller.info);
router.get('auth/profile', profile.profileInfo);
router.put('auth/profile', profile.profileUpdate);
router.get('reservations/courts', reservations.courts);
router.get('reservations/create', reservations.create);
router.get('reservations/search', reservations.search);
// router.get('reservations/cancel/:id', reservations.cancel);
module.exports = router;
