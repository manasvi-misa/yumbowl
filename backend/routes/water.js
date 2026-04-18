const express = require('express');
const WaterLog = require('../models/WaterLog');
const auth = require('../middleware/auth');

const router = express.Router();

// Log water intake
router.post('/', auth, async (req, res) => {
  try {
    const log = new WaterLog({ ...req.body, user: req.userId });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total for date
router.get('/:date', auth, async (req, res) => {
  try {
    const logs = await WaterLog.find({ user: req.userId, date: req.params.date });
    const total = logs.reduce((sum, log) => sum + log.amount, 0);
    res.json({ logs, total: parseFloat(total.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get weekly summary
router.get('/weekly/:startDate', auth, async (req, res) => {
  try {
    const start = req.params.startDate;
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const endStr = end.toISOString().split('T')[0];

    const logs = await WaterLog.find({
      user: req.userId,
      date: { $gte: start, $lte: endStr }
    });

    const byDate = logs.reduce((acc, log) => {
      acc[log.date] = (acc[log.date] || 0) + log.amount;
      return acc;
    }, {});

    res.json(byDate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
