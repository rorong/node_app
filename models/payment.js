// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      rideId: { type: DataTypes.UUID, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      method: { type: DataTypes.ENUM('card', 'wallet', 'cash', 'paypal', 'razorpay'), allowNull: false },
      transactionId: { type: DataTypes.STRING },
      status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' }
    }, { tableName: 'payments', timestamps: true });
    return Payment;
  };
  