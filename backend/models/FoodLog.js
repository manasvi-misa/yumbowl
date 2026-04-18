const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  mealType: { 
    type: String, 
    enum: ['breakfast', 'lunch', 'snack', 'dinner'],
    required: true 
  },
  foodName: { type: String, required: true },
  quantity: { type: String },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  mood: { 
    type: String, 
    enum: ['energized', 'satisfied', 'neutral', 'hungry', 'bloated', 'guilty'],
    default: 'neutral'
  },
  notes: { type: String },
  loggedAt: { type: Date, default: Date.now }
});

foodLogSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('FoodLog', foodLogSchema);
