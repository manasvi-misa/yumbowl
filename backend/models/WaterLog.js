const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  amount: { type: Number, required: true }, // liters
  loggedAt: { type: Date, default: Date.now }
});

waterLogSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('WaterLog', waterLogSchema);
