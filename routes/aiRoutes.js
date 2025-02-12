// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/predict-surge', aiController.predictSurge);

module.exports = router;
