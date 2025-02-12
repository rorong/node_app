// services/paymentService.js
module.exports = {
  charge: async ({ rideId, userId, method, amount }) => {
    if (method === 'card' && amount > 1000) {
      const error = new Error('Card Declined – Please try another card.');
      error.status = 402;
      throw error;
    }
    if (method === 'wallet' && amount > 500) {
      const error = new Error('Insufficient Funds – Check your wallet balance.');
      error.status = 402;
      throw error;
    }
    return { transactionId: 'txn_123456', status: 'completed' };
  }
};
