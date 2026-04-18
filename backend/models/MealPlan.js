const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  prepTime: Number, // minutes
  recipe: String,
  estimatedCost: Number // INR
}, { _id: false });

const mealSchema = new mongoose.Schema({
  mealName: String, // Breakfast, Lunch, Snack, Dinner
  time: String,
  items: [mealItemSchema],
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
  day: String, // Monday, Tuesday, etc.
  meals: [mealSchema],
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number,
  dailyCost: Number
}, { _id: false });

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekPlan: [dayPlanSchema],
  totalWeeklyCost: Number,
  generatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  notes: String,
  shoppingList: [{
    item: String,
    quantity: String,
    estimatedCost: Number,
    category: String
  }]
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
