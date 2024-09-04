// controllers/profile.js
const User = require('../models/user');

exports.profileInfo = async (req, res) => {
  const { email } = req.user; // 從 req.user 中獲取 email

  try {
    // 根據 email 查詢用戶資料
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'false', message: 'User not found' });
    }

    // 返回用戶資訊
    res.json({
      status: 'success',
      userInfo: {
        name: user.name || null,
        email: user.email || null,
        phone: user.phone || null,
        date_of_birth: user.date_of_birth || null,
        address: user.address || null,
        status: user.status || null,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ status: 'false', message: 'Internal server error' });
  }
};

exports.profileUpdate = async (req, res) => {
  const { email } = req.user; // 從 req.user 中獲取 email
  const { name, phone, date_of_birth, address } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (date_of_birth) updateFields.date_of_birth = date_of_birth;
    if (address) updateFields.address = address;
    await user.update(updateFields);

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      userInfo: {
        name: user.name || null,
        email: user.email || null,
        phone: user.phone || null,
        date_of_birth: user.date_of_birth || null,
        address: user.address || null,
        status: user.status || null,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ status: 'false', message: 'Internal server error' });
  }
};
