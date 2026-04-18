const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // Basic Info
  age: { type: Number, required: true, min: 10, max: 100 },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  
  // Physical Stats
  weight: { type: Number, required: true }, // kg
  height: { type: Number, required: true }, // cm
  goalWeight: { type: Number, required: true },
  
  // Activity
  dailySteps: { type: Number, default: 5000 },
  activityLevel: { 
    type: String, 
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    default: 'moderate'
  },
  
  // Diet Preferences
  dietType: { 
    type: String, 
    enum: ['pure_veg', 'non_veg', 'veg_with_egg'],
    required: true
  },
  allergies: [{ type: String }],
  
  // Goals
  goal: { 
    type: String, 
    enum: ['weight_loss', 'muscle_gain', 'maintenance'],
    required: true
  },
  targetProtein: { type: Number }, // g/day
  targetCarbs: { type: Number },   // g/day
  targetFats: { type: Number },    // g/day
  targetCalories: { type: Number }, // kcal/day
  
  // Lifestyle
  monthlyBudget: { type: Number, required: true }, // INR
  mealsPerDay: { type: Number, default: 3, min: 2, max: 6 },
  waterIntakeGoal: { type: Number, default: 2.5 }, // liters
  
  // Computed fields
  bmi: { type: Number },
  bmr: { type: Number },
  tdee: { type: Number },
  
  onboardingComplete: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-compute BMI, BMR, TDEE before save
profileSchema.pre('save', function(next) {
  const heightM = this.height / 100;
  this.bmi = parseFloat((this.weight / (heightM * heightM)).toFixed(1));
  
  // Mifflin-St Jeor BMR
  if (this.gender === 'male') {
    this.bmr = Math.round(10 * this.weight + 6.25 * this.height - 5 * this.age + 5);
  } else {
    this.bmr = Math.round(10 * this.weight + 6.25 * this.height - 5 * this.age - 161);
  }
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  this.tdee = Math.round(this.bmr * (activityMultipliers[this.activityLevel] || 1.55));
  
  // Auto-calc macros if not set
  if (!this.targetCalories) {
    if (this.goal === 'weight_loss') this.targetCalories = this.tdee - 500;
    else if (this.goal === 'muscle_gain') this.targetCalories = this.tdee + 300;
    else this.targetCalories = this.tdee;
  }
  
  if (!this.targetProtein) {
    const proteinMultiplier = this.goal === 'muscle_gain' ? 2.2 : 1.6;
    this.targetProtein = Math.round(this.weight * proteinMultiplier);
  }
  
  if (!this.targetFats) {
    this.targetFats = Math.round((this.targetCalories * 0.25) / 9);
  }
  
  if (!this.targetCarbs) {
    const proteinCals = this.targetProtein * 4;
    const fatCals = this.targetFats * 9;
    this.targetCarbs = Math.round((this.targetCalories - proteinCals - fatCals) / 4);
  }
  
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', profileSchema);
