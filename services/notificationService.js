// services/notificationService.js
module.exports = {
  sendNotification: async ({ userId, message, channels = ['push'] }) => {
    console.log(`Notifying user ${userId} via ${channels.join(', ')}: ${message}`);
    return;
  }
};
