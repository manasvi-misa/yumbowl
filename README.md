#  YumBowl — Personalized Diet Planner

A full-stack diet planning app that generates personalized weekly meal plans based on your body stats, goals, diet preferences, and monthly budget — with real Indian food.

---

## Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React 18, React Router v6, Chart.js       |
| Backend   | Node.js, Express                          |
| Database  | MongoDB (Mongoose ODM)                    |
| Auth      | JWT (JSON Web Tokens) + bcrypt            |
| Hosting   | Vercel (frontend + backend), MongoDB Atlas |

---
```

##  Features

- **Personalized Meal Plans** — 7-day plans based on BMI, TDEE, diet type, allergies, budget
- **50+ Indian Meal Options** — Dal Chawal, Poha, Paneer, Chicken, Fish etc.
- **Auto Macro Calculation** — BMR, TDEE, protein/carbs/fat targets
- **Food Diary** — Log meals with macro tracking, mood tagging
- **Water Tracker** — Visual bottle, quick-add buttons, daily log
- **Progress Tracker** — Weight + measurements over time with charts
- **Shopping List** — Auto-generated weekly grocery list
- **Budget Aware** — Plans optimized for your monthly spend (₹ INR)

---

##  Notes

- The meal plan generator is rule-based (no external AI API needed — works offline!)
- Allergies filter out matching foods from the plan
- Non-veg diet includes all pure_veg + non_veg + egg options
- Budget shown is estimated — actual prices vary by city/market

---

Built with love 
