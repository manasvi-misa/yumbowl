const express = require('express');
const FoodLog = require('../models/FoodLog');
const auth = require('../middleware/auth');

const router = express.Router();

// Add food log
router.post('/', auth, async (req, res) => {
  try {
    const log = new FoodLog({ ...req.body, user: req.userId });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get logs by date
router.get('/:date', auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({ user: req.userId, date: req.params.date }).sort({ loggedAt: 1 });
    
    const summary = logs.reduce((acc, log) => {
      acc.calories += log.calories || 0;
      acc.protein += log.protein || 0;
      acc.carbs += log.carbs || 0;
      acc.fats += log.fats || 0;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    res.json({ logs, summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get logs for a range
router.get('/range/:startDate/:endDate', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const logs = await FoodLog.find({
      user: req.userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1, loggedAt: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete log
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await FoodLog.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
