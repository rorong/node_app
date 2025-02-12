// routes/ratingsRoutes.js
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

router.use(authenticate);

router.post('/', [
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isLength({ max: 500 }).withMessage('Review too long')
], validateRequest, ratingController.submitRating);

router.get('/:rideId', [
  param('rideId').notEmpty().withMessage('Ride ID is required')
], validateRequest, ratingController.getRatingsForRide);

module.exports = router;
