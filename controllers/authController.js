// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const env = process.env.NODE_ENV || 'development'; // Default to 'development' if not set
const config = require('../config/config')[env];

exports.register = async (req, res, next) => {
  try {
    const { email, password, phone, role } = req.body;
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, phone, role: role || 'rider' });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, twoFactorCode } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.twoFactorEnabled && !twoFactorCode) {
      return res.status(403).json({ message: 'Two-factor authentication required' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

exports.socialLogin = async (req, res, next) => {
  // Stub: Integrate with social login providers (e.g., using Passport.js)
  res.status(200).json({ message: 'Social login not yet implemented' });
};
