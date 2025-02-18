// controllers/paymentController.js
const { Payment } = require('../models');
const paymentService = require('../services/paymentService');

exports.processPayment = async (req, res, next) => {
  try {
    const { rideId, method, amount } = req.body;
    const paymentResult = await paymentService.charge({ rideId, userId: req.user.id, method, amount });
    const payment = await Payment.create({
      userId: req.user.id,
      rideId,
      amount,
      method,
      transactionId: paymentResult.transactionId,
      status: paymentResult.status
    });
    res.status(200).json({ message: 'Payment processed successfully', paymentId: payment.id });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentReport = async (req, res, next) => {
  try {
    const report = {
      totalRevenue: 10000,
      totalTransactions: 200,
      pendingPayouts: 1500
    };
    res.status(200).json({ report });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentDetails = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
};
