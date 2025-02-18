// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const userController = require('../controllers/userController');

router.use(authenticate);

router.get('/profile', userController.getProfile);
router.patch('/profile', [
  body('name').optional().isString(),
  body('email').optional().isEmail(),
  body('password').optional().isString(),
  body('newPassword').optional().isString()
], validateRequest, userController.updateProfile);

router.get('/addresses', userController.getAddresses);
router.post('/addresses', [
  body('address').notEmpty().withMessage('Address is required')
], validateRequest, userController.addAddress);
router.get('/addresses/export/csv', userController.exportAddressesCSV);
router.get('/addresses/export/pdf', userController.exportAddressesPDF);

module.exports = router;