const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  weight: { type: Number }, // kg
  chest: { type: Number }, // cm
  waist: { type: Number },
  hips: { type: Number },
  arms: { type: Number },
  thighs: { type: Number },
  steps: { type: Number },
  notes: { type: String },
  loggedAt: { type: Date, default: Date.now }
});

progressSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Progress', progressSchema);
