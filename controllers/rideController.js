// controllers/rideController.js
const { Ride } = require('../models');

const calculateFare = (pickup, dropoff) => {
  // Stub: Implement fare calculation (including dynamic pricing)
  return 20.0;
};

exports.bookRide = async (req, res, next) => {
  try {
    const {
      pickupLocation,
      dropoffLocation,
      scheduledAt,
      rideType,
      biddingEnabled,
      advancedOptions
    } = req.body;
    
    // Validate that scheduled time is in the future, if provided.
    if (scheduledAt && new Date(scheduledAt) <= new Date()) {
      return res.status(400).json({ message: 'Scheduled time must be in the future' });
    }

    const pickupCoords = pickupLocation.match(/POINT\(([^ ]+) ([^ ]+)\)/);
    const dropoffCoords = dropoffLocation.match(/POINT\(([^ ]+) ([^ ]+)\)/);

    if (!pickupCoords || !dropoffCoords) {
      return res.status(400).json({ message: 'Invalid location format' });
    }

    const formattedPickup = { type: 'Point', coordinates: [parseFloat(pickupCoords[1]), parseFloat(pickupCoords[2])] };
    const formattedDropoff = { type: 'Point', coordinates: [parseFloat(dropoffCoords[1]), parseFloat(dropoffCoords[2])] };

    const fare = calculateFare(formattedPickup, formattedDropoff);

    const ride = await Ride.create({
      userId: req.user.id,
      pickupLocation: formattedPickup,
      dropoffLocation: formattedDropoff,
      fare,
      scheduledAt: scheduledAt || null,
      rideType: rideType || 'standard',
      biddingEnabled: biddingEnabled || false,
      pricingFactors: { advancedOptions }
    });

    req.app.get('io').emit('rideRequested', { rideId: ride.id, pickupLocation, dropoffLocation });
    res.status(201).json({ message: 'Ride booked successfully', rideId: ride.id, fare });
  } catch (error) {
    console.error('Error booking ride:', error);
    next(error);
  }
};

exports.updateRideStatus = async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const { status, driverId } = req.body;
    const ride = await Ride.findOne({ where: { id: rideId } });
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    ride.status = status;
    if (driverId) ride.driverId = driverId;
    await ride.save();
    req.app.get('io').emit('rideStatusUpdated', { rideId: ride.id, status });
    res.status(200).json({ message: 'Ride status updated successfully' });
  } catch (error) {
    next(error);
  }
};