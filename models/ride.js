// models/ride.js
module.exports = (sequelize, DataTypes) => {
    const Ride = sequelize.define('Ride', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      driverId: { type: DataTypes.UUID },
      pickupLocation: { type: DataTypes.GEOGRAPHY('POINT'), allowNull: false },
      dropoffLocation: { type: DataTypes.GEOGRAPHY('POINT'), allowNull: false },
      fare: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: { type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'), defaultValue: 'requested' },
      scheduledAt: { type: DataTypes.DATE },
      rideType: { type: DataTypes.ENUM('standard', 'carpool', 'luxury'), defaultValue: 'standard' },
      biddingEnabled: { type: DataTypes.BOOLEAN, defaultValue: false },
      pricingFactors: { type: DataTypes.JSON },
      accessibilityOptions: { type: DataTypes.JSON }
    }, { tableName: 'rides', timestamps: true });
    return Ride;
  };
  