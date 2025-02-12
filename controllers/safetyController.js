// controllers/safetyController.js
const notificationService = require('../services/notificationService');

exports.sendSOS = async (req, res, next) => {
  try {
    const { location } = req.body;
    await notificationService.sendNotification({
      userId: req.user.id,
      message: `SOS triggered at ${JSON.stringify(location)}`,
      channels: ['sms', 'push']
    });
    res.status(200).json({ message: 'SOS alert sent successfully' });
  } catch (error) {
    next(error);
  }
};

exports.detectAnomaly = async (req, res, next) => {
  try {
    // Stub: In production, integrate AI anomaly detection logic.
    res.status(200).json({ message: 'No anomalies detected' });
  } catch (error) {
    next(error);
  }
};