const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // Default to 'development' if not set
const config = require('../config/config')[env]; // Load correct environment config

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect, logging: config.logging }
);

const db = { Sequelize, sequelize };

db.User = require('./user')(sequelize, Sequelize);
db.Ride = require('./ride')(sequelize, Sequelize);
db.Payment = require('./payment')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Ride, { foreignKey: 'userId' });
db.Ride.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
