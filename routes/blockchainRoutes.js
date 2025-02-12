// routes/blockchainRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

router.use(authenticate);

router.post('/payout', [
  body('driverId').notEmpty().withMessage('Driver ID is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero')
], validateRequest, blockchainController.processPayout);

module.exports = router;
