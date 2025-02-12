// controllers/aiController.js
const aiService = require('../services/aiService');

exports.predictSurge = async (req, res, next) => {
  try {
    const prediction = await aiService.predictDemand();
    res.status(200).json({ surgeMultiplier: prediction.surgeMultiplier });
  } catch (error) {
    next(error);
  }
};