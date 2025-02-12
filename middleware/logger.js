// middleware/logger.js
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'combined.log' }), // Log to a file
    new winston.transports.File({ filename: 'errors.log', level: 'error' }), // Log errors to a separate file
  ],
});


// Request Logger Middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      ip: req.ip, // Or req.connection.remoteAddress if req.ip is undefined
      user: req.user ? req.user.id : 'anonymous', // If you have user authentication
      userAgent: req.headers['user-agent'],
    });
  });

  next();
};

module.exports = { logger, requestLogger }; // Export both the logger and the middleware