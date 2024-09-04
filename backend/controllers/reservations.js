// controllers/profile.js
const Court = require('../models/court');

exports.courts = async (req, res) => {
  try {
    const court = await Court.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!court) {
      return res
        .status(404)
        .json({ status: 'false', message: 'Court not found' });
    }

    res.json({
      status: 'success',
      court,
    });
  } catch (error) {
    console.error('Error fetching court profile:', error);
    res.status(500).json({ status: 'false', message: 'Internal server error' });
  }
};

exports.search = async (req, res) => {
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
      user: {
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
