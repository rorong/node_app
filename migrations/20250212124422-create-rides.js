'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rides', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      driverId: {
        type: Sequelize.UUID
      },
      pickupLocation: {
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: false
      },
      dropoffLocation: {
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: false
      },
      fare: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'),
        defaultValue: 'requested'
      },
      scheduledAt: {
        type: Sequelize.DATE
      },
      rideType: {
        type: Sequelize.ENUM('standard', 'carpool', 'luxury'),
        defaultValue: 'standard'
      },
      biddingEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pricingFactors: {
        type: Sequelize.JSON
      },
      accessibilityOptions: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rides');
  }
};
