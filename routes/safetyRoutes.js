// routes/safetyRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const safetyController = require('../controllers/safetyController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

router.use(authenticate);

router.post('/sos', [
  body('location').notEmpty().withMessage('Location is required')
], validateRequest, safetyController.sendSOS);

router.get('/anomaly', safetyController.detectAnomaly);

module.exports = router;
