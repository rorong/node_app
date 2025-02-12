// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
});