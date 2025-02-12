// routes/paymentRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

router.use(authenticate);

router.post('/process', [
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  body('method').notEmpty().withMessage('Payment method is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero')
], validateRequest, paymentController.processPayment);

router.get('/report', paymentController.getPaymentReport);

module.exports = router;
