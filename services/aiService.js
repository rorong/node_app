// services/aiService.js
module.exports = {
  predictDemand: async () => {
    return { surgeMultiplier: 1.5 };
  },
  getRecommendations: async (userId) => {
    return ['Destination A', 'Destination B'];
  }
};
