// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'User endpoint under construction' });
});

module.exports = router;
