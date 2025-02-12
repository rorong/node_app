// controllers/blockchainController.js
const blockchainService = require('../services/blockchainService');

exports.processPayout = async (req, res, next) => {
  try {
    const { driverId, amount } = req.body;
    const result = await blockchainService.processPayout(driverId, amount);
    res.status(200).json({ message: 'Payout processed successfully', transactionHash: result.transactionHash });
  } catch (error) {
    next(error);
  }
};
