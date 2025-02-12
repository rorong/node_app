// routes/rideRoutes.js
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const rideController = require('../controllers/rideController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

router.use(authenticate);

router.post('/book', [
  body('pickupLocation').exists().withMessage('Pickup location is required'),
  body('dropoffLocation').exists().withMessage('Dropoff location is required'),
  body('scheduledAt').optional().isISO8601().withMessage('Scheduled time must be a valid date')
], validateRequest, rideController.bookRide);

router.patch('/:rideId/status', [
  param('rideId').notEmpty().withMessage('Ride ID is required'),
  body('status').notEmpty().withMessage('Status is required')
], validateRequest, rideController.updateRideStatus);

module.exports = router;
