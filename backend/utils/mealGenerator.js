// Comprehensive meal database - Indian context with nutritional data
const MEAL_DATABASE = {
  breakfast: {
    pure_veg: [
      { name: 'Oats Porridge with Banana', calories: 350, protein: 12, carbs: 58, fats: 6, prepTime: 10, cost: 30, recipe: 'Cook 50g rolled oats in milk, top with sliced banana and honey' },
      { name: 'Poha with Peanuts', calories: 320, protein: 9, carbs: 55, fats: 8, prepTime: 15, cost: 25, recipe: 'Rinse poha, temper with mustard seeds, curry leaves, add peanuts and turmeric' },
      { name: 'Upma', calories: 290, protein: 8, carbs: 52, fats: 7, prepTime: 20, cost: 20, recipe: 'Roast semolina, add vegetables and tempered spices, cook with water' },
      { name: 'Idli with Sambar (3 pieces)', calories: 280, protein: 10, carbs: 50, fats: 3, prepTime: 30, cost: 30, recipe: 'Steam idli batter, serve with fresh sambar and coconut chutney' },
      { name: 'Besan Chilla (2 pieces)', calories: 310, protein: 14, carbs: 40, fats: 9, prepTime: 15, cost: 20, recipe: 'Mix besan with veggies and spices, cook thin pancakes on non-stick pan' },
      { name: 'Moong Dal Dosa', calories: 270, protein: 13, carbs: 42, fats: 5, prepTime: 25, cost: 25, recipe: 'Blend soaked moong dal, make thin crepes, serve with chutney' },
      { name: 'Greek Yogurt with Berries & Granola', calories: 380, protein: 18, carbs: 48, fats: 10, prepTime: 5, cost: 60, recipe: 'Layer Greek yogurt, mixed berries and granola in a bowl' },
      { name: 'Peanut Butter Toast (2 slices)', calories: 380, protein: 15, carbs: 42, fats: 18, prepTime: 5, cost: 35, recipe: 'Toast whole wheat bread, spread peanut butter generously' },
      { name: 'Paneer Bhurji', calories: 340, protein: 18, carbs: 12, fats: 22, prepTime: 15, cost: 50, recipe: 'Crumble paneer, cook with onions, tomatoes, and spices' },
      { name: 'Masala Dalia', calories: 300, protein: 10, carbs: 54, fats: 5, prepTime: 20, cost: 20, recipe: 'Cook broken wheat with vegetables and mild spices' }
    ],
    non_veg: [
      { name: 'Egg Bhurji with Toast', calories: 400, protein: 22, carbs: 35, fats: 18, prepTime: 10, cost: 40, recipe: 'Scramble 3 eggs with onions, tomatoes, green chilli, serve with 2 toast slices' },
      { name: 'Chicken Sandwich', calories: 380, protein: 28, carbs: 38, fats: 12, prepTime: 15, cost: 55, recipe: 'Shredded chicken breast with mustard, lettuce between whole wheat bread' },
      { name: 'Boiled Eggs with Oats', calories: 360, protein: 24, carbs: 42, fats: 10, prepTime: 15, cost: 35, recipe: 'Cook oats, serve with 3 boiled eggs and fruit' },
      { name: 'Tuna Poha', calories: 340, protein: 25, carbs: 45, fats: 6, prepTime: 15, cost: 60, recipe: 'Classic poha preparation with canned tuna added' }
    ],
    veg_with_egg: [
      { name: 'Omelette with Vegetables', calories: 350, protein: 20, carbs: 15, fats: 22, prepTime: 10, cost: 35, recipe: '3-egg omelette stuffed with bell peppers, onions and spinach' },
      { name: 'Egg Fried Rice (light)', calories: 380, protein: 18, carbs: 52, fats: 10, prepTime: 20, cost: 30, recipe: 'Brown rice fried with egg, peas and soy sauce' },
      { name: 'Scrambled Eggs & Avocado Toast', calories: 420, protein: 20, carbs: 38, fats: 22, prepTime: 10, cost: 80, recipe: 'Creamy scrambled eggs on avocado smashed whole wheat toast' },
      { name: 'Egg Dosa', calories: 310, protein: 16, carbs: 42, fats: 9, prepTime: 25, cost: 30, recipe: 'Crispy dosa with egg cracked inside, served with chutney' }
    ]
  },
  lunch: {
    pure_veg: [
      { name: 'Dal Rice + Sabzi', calories: 550, protein: 18, carbs: 85, fats: 12, prepTime: 30, cost: 40, recipe: 'Cook toor dal with tomatoes and spices, serve with rice and seasonal vegetable' },
      { name: 'Rajma Chawal', calories: 580, protein: 20, carbs: 90, fats: 10, prepTime: 45, cost: 45, recipe: 'Slow-cook kidney beans in rich tomato gravy, serve with steamed rice' },
      { name: 'Paneer Tikka Wrap', calories: 500, protein: 22, carbs: 55, fats: 18, prepTime: 25, cost: 70, recipe: 'Marinated grilled paneer cubes in whole wheat roti with mint chutney' },
      { name: 'Chole with Roti (2)', calories: 520, protein: 18, carbs: 80, fats: 10, prepTime: 35, cost: 40, recipe: 'Spicy chickpea curry with whole wheat rotis' },
      { name: 'Vegetable Khichdi', calories: 420, protein: 15, carbs: 72, fats: 8, prepTime: 25, cost: 30, recipe: 'One-pot rice and moong dal with mixed vegetables' },
      { name: 'Mix Veg + 2 Rotis + Dal', calories: 490, protein: 16, carbs: 78, fats: 9, prepTime: 30, cost: 35, recipe: 'Seasonal mixed vegetables curry, dal and whole wheat rotis' },
      { name: 'Soybean Curry + Rice', calories: 520, protein: 25, carbs: 72, fats: 12, prepTime: 30, cost: 40, recipe: 'Protein-rich soybean chunks in tomato onion gravy with rice' },
      { name: 'Palak Paneer + Roti (2)', calories: 540, protein: 22, carbs: 60, fats: 20, prepTime: 35, cost: 65, recipe: 'Creamy spinach with paneer cubes, served with rotis' }
    ],
    non_veg: [
      { name: 'Chicken Rice Bowl', calories: 560, protein: 42, carbs: 62, fats: 12, prepTime: 30, cost: 90, recipe: '150g grilled chicken breast on brown rice with stir-fry vegetables' },
      { name: 'Fish Curry + Rice', calories: 520, protein: 38, carbs: 68, fats: 10, prepTime: 35, cost: 100, recipe: 'Rohu or Pomfret in light coconut curry with steamed rice' },
      { name: 'Chicken Biryani (light)', calories: 580, protein: 36, carbs: 72, fats: 14, prepTime: 45, cost: 90, recipe: 'Fragrant basmati rice with tender chicken pieces and whole spices' },
      { name: 'Egg Curry + Rice', calories: 490, protein: 28, carbs: 68, fats: 14, prepTime: 25, cost: 50, recipe: 'Boiled eggs in onion-tomato gravy with steamed rice' },
      { name: 'Mutton Stew + 2 Rotis', calories: 600, protein: 40, carbs: 55, fats: 22, prepTime: 50, cost: 120, recipe: 'Slow-cooked mutton with vegetables in light gravy' }
    ],
    veg_with_egg: [
      { name: 'Egg Curry + Rice', calories: 490, protein: 28, carbs: 68, fats: 14, prepTime: 25, cost: 50, recipe: 'Boiled eggs in onion-tomato gravy with steamed rice' },
      { name: 'Spanish Omelette + Salad', calories: 420, protein: 24, carbs: 30, fats: 22, prepTime: 20, cost: 50, recipe: 'Thick omelette with potatoes and onions, side salad' },
      { name: 'Egg Fried Rice', calories: 500, protein: 22, carbs: 72, fats: 12, prepTime: 20, cost: 40, recipe: 'Brown rice stir-fried with eggs, vegetables and soy sauce' }
    ]
  },
  snack: {
    pure_veg: [
      { name: 'Mixed Nuts (30g)', calories: 180, protein: 5, carbs: 6, fats: 16, prepTime: 0, cost: 30, recipe: 'Almonds, walnuts, cashews mix' },
      { name: 'Fruit Bowl', calories: 150, protein: 2, carbs: 38, fats: 1, prepTime: 5, cost: 25, recipe: 'Seasonal fruits - apple, banana, orange' },
      { name: 'Roasted Chana (50g)', calories: 200, protein: 10, carbs: 30, fats: 4, prepTime: 0, cost: 15, recipe: 'Spiced roasted chickpeas - great protein snack' },
      { name: 'Greek Yogurt (200g)', calories: 180, protein: 16, carbs: 12, fats: 4, prepTime: 0, cost: 40, recipe: 'Plain Greek yogurt with a dash of honey' },
      { name: 'Sprouts Chaat', calories: 160, protein: 10, carbs: 28, fats: 2, prepTime: 10, cost: 20, recipe: 'Mixed sprouts with lemon, chaat masala, coriander' },
      { name: 'Peanut Butter + Apple', calories: 250, protein: 8, carbs: 28, fats: 14, prepTime: 5, cost: 30, recipe: '1 apple with 2 tbsp peanut butter for dipping' }
    ],
    non_veg: [
      { name: 'Boiled Eggs (2)', calories: 155, protein: 13, carbs: 1, fats: 10, prepTime: 10, cost: 20, recipe: 'Hard boiled eggs with a pinch of pepper and salt' },
      { name: 'Chicken Tikka (100g)', calories: 200, protein: 28, carbs: 5, fats: 8, prepTime: 20, cost: 60, recipe: 'Marinated chicken pieces grilled in oven or tandoor' },
      { name: 'Tuna with Crackers', calories: 220, protein: 22, carbs: 18, fats: 6, prepTime: 5, cost: 60, recipe: 'Canned tuna on whole grain crackers' }
    ],
    veg_with_egg: [
      { name: 'Boiled Eggs (2)', calories: 155, protein: 13, carbs: 1, fats: 10, prepTime: 10, cost: 20, recipe: 'Hard boiled eggs with a pinch of pepper and salt' },
      { name: 'Egg White Omelette', calories: 120, protein: 14, carbs: 3, fats: 4, prepTime: 10, cost: 20, recipe: '4 egg whites with spinach in a mini omelette' }
    ]
  },
  dinner: {
    pure_veg: [
      { name: 'Lentil Soup + 2 Rotis', calories: 440, protein: 18, carbs: 70, fats: 7, prepTime: 25, cost: 35, recipe: 'Thick masoor or moong dal soup with whole wheat rotis' },
      { name: 'Paneer Bhurji + Roti (2)', calories: 480, protein: 24, carbs: 52, fats: 20, prepTime: 20, cost: 65, recipe: 'Scrambled paneer with vegetables, served with rotis' },
      { name: 'Tofu Stir Fry + Brown Rice', calories: 420, protein: 20, carbs: 58, fats: 12, prepTime: 25, cost: 60, recipe: 'Tofu and vegetables in soy-ginger sauce over brown rice' },
      { name: 'Matar Mushroom + Roti', calories: 400, protein: 14, carbs: 60, fats: 10, prepTime: 25, cost: 45, recipe: 'Peas and mushroom in light tomato gravy with rotis' },
      { name: 'Dal Tadka + Rice', calories: 460, protein: 16, carbs: 78, fats: 9, prepTime: 25, cost: 35, recipe: 'Tempered yellow dal with ghee and spices, steamed rice' },
      { name: 'Quinoa Pulao', calories: 380, protein: 14, carbs: 62, fats: 8, prepTime: 25, cost: 55, recipe: 'Quinoa cooked with mixed vegetables and whole spices' }
    ],
    non_veg: [
      { name: 'Grilled Chicken + Vegetables', calories: 480, protein: 45, carbs: 30, fats: 14, prepTime: 25, cost: 110, recipe: '180g grilled chicken with roasted seasonal vegetables' },
      { name: 'Fish Tikka + Dal + Roti', calories: 520, protein: 42, carbs: 55, fats: 12, prepTime: 30, cost: 110, recipe: 'Spiced fish tikka served with dal and 2 rotis' },
      { name: 'Chicken Curry + Rice', calories: 560, protein: 40, carbs: 65, fats: 14, prepTime: 35, cost: 100, recipe: 'Home-style chicken curry with steamed rice' },
      { name: 'Prawn Masala + Roti', calories: 480, protein: 38, carbs: 52, fats: 12, prepTime: 30, cost: 120, recipe: 'Spicy prawn masala with whole wheat rotis' }
    ],
    veg_with_egg: [
      { name: 'Egg Curry + Rice', calories: 490, protein: 28, carbs: 68, fats: 14, prepTime: 25, cost: 50, recipe: 'Boiled eggs in onion-tomato gravy with steamed rice' },
      { name: 'Egg Fried Rice', calories: 450, protein: 22, carbs: 62, fats: 12, prepTime: 20, cost: 40, recipe: 'Brown rice stir-fried with eggs and vegetables' },
      { name: 'Omelette + Vegetable Soup', calories: 380, protein: 24, carbs: 28, fats: 18, prepTime: 20, cost: 45, recipe: '3-egg omelette with a bowl of vegetable clear soup' }
    ]
  }
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MEAL_TIMES = {
  breakfast: '7:30 AM',
  lunch: '12:30 PM',
  snack: '4:00 PM',
  dinner: '7:30 PM',
  snack2: '10:00 AM',
  snack3: '7:00 PM'
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function filterAllergies(items, allergies) {
  if (!allergies || allergies.length === 0) return items;
  return items.filter(item => {
    const itemNameLower = item.name.toLowerCase();
    return !allergies.some(allergy => itemNameLower.includes(allergy.toLowerCase()));
  });
}

function getMealItems(mealType, dietType, allergies) {
  const allItems = MEAL_DATABASE[mealType];
  let availableItems = [];

  // Combine veg options for non_veg and veg_with_egg
  if (allItems.pure_veg) availableItems = [...allItems.pure_veg];
  
  if (dietType === 'non_veg' && allItems.non_veg) {
    availableItems = [...availableItems, ...allItems.non_veg];
  }
  
  if (dietType === 'veg_with_egg' && allItems.veg_with_egg) {
    availableItems = [...availableItems, ...allItems.veg_with_egg];
  }
  
  if (dietType === 'non_veg' && allItems.veg_with_egg) {
    availableItems = [...availableItems, ...allItems.veg_with_egg];
  }

  availableItems = filterAllergies(availableItems, allergies);
  return availableItems;
}

function generateMealPlan(profile) {
  const { dietType, allergies, mealsPerDay, targetCalories, targetProtein, monthlyBudget, goal } = profile;
  
  const dailyBudget = Math.round(monthlyBudget / 30);
  const weekPlan = [];
  let totalWeeklyCost = 0;

  const mealTypes = mealsPerDay >= 4 
    ? ['breakfast', 'lunch', 'snack', 'dinner']
    : mealsPerDay === 3 
    ? ['breakfast', 'lunch', 'dinner']
    : ['breakfast', 'dinner'];

  const usedMeals = { breakfast: [], lunch: [], snack: [], dinner: [] };

  for (const day of DAYS) {
    const dayMeals = [];
    let dayCalories = 0, dayProtein = 0, dayCarbs = 0, dayFats = 0, dayCost = 0;

    for (const mealType of mealTypes) {
      const availableItems = getMealItems(mealType, dietType, allergies);
      
      // Avoid repeating same meal within the week
      let unusedItems = availableItems.filter(item => !usedMeals[mealType].includes(item.name));
      if (unusedItems.length === 0) {
        usedMeals[mealType] = [];
        unusedItems = availableItems;
      }

      const selectedItem = getRandomItem(unusedItems);
      usedMeals[mealType].push(selectedItem.name);

      const meal = {
        mealName: mealType.charAt(0).toUpperCase() + mealType.slice(1),
        time: MEAL_TIMES[mealType],
        items: [{
          name: selectedItem.name,
          quantity: '1 serving',
          calories: selectedItem.calories,
          protein: selectedItem.protein,
          carbs: selectedItem.carbs,
          fats: selectedItem.fats,
          prepTime: selectedItem.prepTime,
          recipe: selectedItem.recipe,
          estimatedCost: selectedItem.cost
        }],
        totalCalories: selectedItem.calories,
        totalProtein: selectedItem.protein,
        totalCarbs: selectedItem.carbs,
        totalFats: selectedItem.fats
      };

      dayCalories += selectedItem.calories;
      dayProtein += selectedItem.protein;
      dayCarbs += selectedItem.carbs;
      dayFats += selectedItem.fats;
      dayCost += selectedItem.cost;

      dayMeals.push(meal);
    }

    weekPlan.push({
      day,
      meals: dayMeals,
      totalCalories: dayCalories,
      totalProtein: dayProtein,
      totalCarbs: dayCarbs,
      totalFats: dayFats,
      dailyCost: dayCost
    });

    totalWeeklyCost += dayCost;
  }

  // Generate shopping list
  const shoppingList = generateShoppingList(weekPlan, dietType);

  return { weekPlan, totalWeeklyCost, shoppingList };
}

function generateShoppingList(weekPlan, dietType) {
  const items = {
    grains: [
      { item: 'Brown Rice / Basmati Rice', quantity: '2 kg', estimatedCost: 120, category: 'Grains' },
      { item: 'Whole Wheat Atta', quantity: '2 kg', estimatedCost: 80, category: 'Grains' },
      { item: 'Rolled Oats', quantity: '500g', estimatedCost: 80, category: 'Grains' }
    ],
    pulses: [
      { item: 'Toor Dal', quantity: '500g', estimatedCost: 70, category: 'Pulses' },
      { item: 'Moong Dal', quantity: '500g', estimatedCost: 80, category: 'Pulses' },
      { item: 'Chana Dal', quantity: '500g', estimatedCost: 65, category: 'Pulses' }
    ],
    dairy: [
      { item: 'Milk (full fat)', quantity: '2 liters', estimatedCost: 100, category: 'Dairy' },
      { item: 'Curd / Yogurt', quantity: '500g', estimatedCost: 50, category: 'Dairy' },
      { item: 'Paneer', quantity: '500g', estimatedCost: 200, category: 'Dairy' }
    ],
    vegetables: [
      { item: 'Spinach / Palak', quantity: '500g', estimatedCost: 30, category: 'Vegetables' },
      { item: 'Tomatoes', quantity: '1 kg', estimatedCost: 40, category: 'Vegetables' },
      { item: 'Onions', quantity: '1 kg', estimatedCost: 35, category: 'Vegetables' },
      { item: 'Mixed Seasonal Vegetables', quantity: '2 kg', estimatedCost: 80, category: 'Vegetables' }
    ],
    fruits: [
      { item: 'Bananas', quantity: '1 dozen', estimatedCost: 50, category: 'Fruits' },
      { item: 'Apples', quantity: '6 pcs', estimatedCost: 90, category: 'Fruits' },
      { item: 'Mixed Berries (frozen)', quantity: '500g', estimatedCost: 150, category: 'Fruits' }
    ],
    protein: [
      { item: 'Roasted Chana', quantity: '500g', estimatedCost: 60, category: 'Protein Snacks' },
      { item: 'Mixed Nuts', quantity: '200g', estimatedCost: 160, category: 'Protein Snacks' },
      { item: 'Peanut Butter', quantity: '1 jar (500g)', estimatedCost: 180, category: 'Protein Snacks' }
    ]
  };

  const nonVegItems = [
    { item: 'Chicken Breast', quantity: '1 kg', estimatedCost: 280, category: 'Non-Veg Protein' },
    { item: 'Eggs', quantity: '2 dozen', estimatedCost: 120, category: 'Non-Veg Protein' },
    { item: 'Fish (Rohu/Pomfret)', quantity: '500g', estimatedCost: 200, category: 'Non-Veg Protein' }
  ];

  const vegEggItems = [
    { item: 'Eggs', quantity: '2 dozen', estimatedCost: 120, category: 'Eggs' }
  ];

  let shoppingList = [...items.grains, ...items.pulses, ...items.dairy, ...items.vegetables, ...items.fruits, ...items.protein];

  if (dietType === 'non_veg') shoppingList = [...shoppingList, ...nonVegItems];
  if (dietType === 'veg_with_egg') shoppingList = [...shoppingList, ...vegEggItems];

  return shoppingList;
}

module.exports = { generateMealPlan };
