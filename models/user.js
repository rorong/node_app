// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
      phone: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM('rider', 'driver', 'admin'), defaultValue: 'rider', allowNull: false },
      profilePicture: { type: DataTypes.STRING },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      vehicleDetails: { type: DataTypes.JSON },
      documentStatus: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
      twoFactorEnabled: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { tableName: 'users', timestamps: true });
    return User;
  };
  