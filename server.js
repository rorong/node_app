// server.js
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const { Server: socketIo } = require('socket.io');
const winston = require('winston');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');
const { sequelize } = require('./models'); // Loads models/index.js

dotenv.config();

// Configure winston logger
const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/server.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )
};
const logger = winston.createLogger(logConfiguration);

const app = express();

logger.info('Initializing middleware...');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger.requestLogger);
app.use(rateLimiter);

logger.info('Importing routes...');
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const ratingsRoutes = require('./routes/ratingsRoutes');
const safetyRoutes = require('./routes/safetyRoutes');
const aiRoutes = require('./routes/aiRoutes');
const blockchainRoutes = require('./routes/blockchainRoutes');

logger.info('Mounting routes...');
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/blockchain', blockchainRoutes);

app.use(errorHandler);

logger.info('Create Server...');
const server = http.createServer(app);
const io = new socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
app.set('io', io);

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  socket.on('disconnect', () => logger.info(`Client disconnected: ${socket.id}`));
});

logger.info('Init Database...');
const PORT = process.env.PORT || 10000;
if (!process.env.PORT) {
  logger.error('PORT is not defined in .env');
  process.exit(1);
}

const authenticateWithTimeout = (sequelize, timeout = 5000) => {
  return Promise.race([
    sequelize.authenticate(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB connection timeout')), timeout)
    )
  ]);
};

authenticateWithTimeout(sequelize)
  .then(() => {
    logger.info('Database connected...');
    // Do not call sequelize.sync() in production.
    server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch(err => {
    logger.error('DB connection error:', err);
    process.exit(1);
  });

module.exports = server;