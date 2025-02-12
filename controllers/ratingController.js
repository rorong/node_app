// controllers/ratingController.js
const { Rating } = require('../models');

exports.submitRating = async (req, res, next) => {
  try {
    const { rideId, userId, rating, review } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const newRating = await Rating.create({ rideId, userId, rating, review });
    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
  } catch (error) {
    next(error);
  }
};

exports.getRatingsForRide = async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const ratings = await Rating.findAll({ where: { rideId } });
    res.status(200).json({ ratings });
  } catch (error) {
    next(error);
  }
};