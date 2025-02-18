// services/mappingService.js
module.exports = {
  getRoute: async (pickup, dropoff) => {
    return { distance: 5.0, duration: 15, route: [] };
  }
};
