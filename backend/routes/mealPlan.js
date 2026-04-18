const express = require('express');
const MealPlan = require('../models/MealPlan');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { generateMealPlan } = require('../utils/mealGenerator');

const router = express.Router();

// Generate new meal plan
router.post('/generate', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId });
    if (!profile) return res.status(404).json({ error: 'Please complete your profile first' });

    // Deactivate old plans
    await MealPlan.updateMany({ user: req.userId }, { isActive: false });

    const { weekPlan, totalWeeklyCost, shoppingList } = generateMealPlan(profile);

    const mealPlan = new MealPlan({
      user: req.userId,
      weekPlan,
      totalWeeklyCost,
      shoppingList,
      isActive: true
    });

    await mealPlan.save();
    res.json(mealPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get active meal plan
router.get('/active', auth, async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ user: req.userId, isActive: true }).sort({ generatedAt: -1 });
    if (!plan) return res.status(404).json({ error: 'No active meal plan' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all meal plans
router.get('/', auth, async (req, res) => {
  try {
    const plans = await MealPlan.find({ user: req.userId }).sort({ generatedAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get today's meals from active plan
router.get('/today', auth, async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ user: req.userId, isActive: true }).sort({ generatedAt: -1 });
    if (!plan) return res.status(404).json({ error: 'No active meal plan' });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[new Date().getDay()];
    const todayPlan = plan.weekPlan.find(d => d.day === todayName);

    res.json({ day: todayName, plan: todayPlan, shoppingList: plan.shoppingList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
