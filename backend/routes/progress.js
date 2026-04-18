const express = require('express');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// Log progress
router.post('/', auth, async (req, res) => {
  try {
    const existing = await Progress.findOne({ user: req.userId, date: req.body.date });
    if (existing) {
      Object.assign(existing, req.body);
      await existing.save();
      return res.json(existing);
    }
    const progress = new Progress({ ...req.body, user: req.userId });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all progress entries
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.userId }).sort({ date: 1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest progress
router.get('/latest', auth, async (req, res) => {
  try {
    const latest = await Progress.findOne({ user: req.userId }).sort({ date: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
