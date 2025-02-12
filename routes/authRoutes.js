// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('phone').isMobilePhone().withMessage('Invalid phone number')
], validateRequest, authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').exists().withMessage('Password is required')
], validateRequest, authController.login);

router.post('/social', authController.socialLogin);

module.exports = router;
