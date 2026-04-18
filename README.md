# 🥗 YumBowl — Personalized Diet Planner

A full-stack diet planning app that generates personalized weekly meal plans based on your body stats, goals, diet preferences, and monthly budget — with real Indian food.

---

## 🚀 Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React 18, React Router v6, Chart.js       |
| Backend   | Node.js, Express                          |
| Database  | MongoDB (Mongoose ODM)                    |
| Auth      | JWT (JSON Web Tokens) + bcrypt            |
| Hosting   | Vercel (frontend + backend), MongoDB Atlas |

---

## 📁 Project Structure

```
yumbowl/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   ├── middleware/       # JWT auth middleware
│   ├── utils/           # Meal plan generator logic
│   └── server.js        # Entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/styles/  # Global CSS
│       ├── components/     # Reusable UI + layout
│       ├── hooks/          # Auth context
│       ├── pages/          # All page components
│       └── utils/          # Axios instance
└── vercel.json          # Deployment config
```

---

## 🛠️ Local Setup (No Downloads Needed — Node.js Already Installed)

### 1. Clone / Unzip the project

### 2. Set up the Backend

```bash
cd backend

# Copy environment file
cp .env.example .env
# Edit .env — fill in your MongoDB URI and a JWT secret:
# MONGODB_URI=mongodb://localhost:27017/yumbowl    ← local MongoDB
# JWT_SECRET=any_random_long_string_here

npm install
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Set up the Frontend

```bash
cd frontend
cp .env.example .env
# .env already points to http://localhost:5000/api — no changes needed locally

npm install
npm start
# Frontend runs on http://localhost:3000
```

---

## ☁️ Deploy to Vercel + MongoDB Atlas (Free)

### Step 1: MongoDB Atlas (Free Cloud DB)
1. Go to https://cloud.mongodb.com → Create free cluster
2. Create a database user (username + password)
3. Whitelist IP `0.0.0.0/0` (allow all)
4. Get your connection string: `mongodb+srv://user:pass@cluster.mongodb.net/yumbowl`

### Step 2: Deploy Backend to Vercel
1. Push the `backend/` folder to a GitHub repo (or the whole monorepo)
2. Go to https://vercel.com → New Project → Import repo
3. Set **Root Directory** to `backend`
4. Add Environment Variables:
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = any long random string
   - `FRONTEND_URL` = your frontend Vercel URL (set after deploying frontend)
5. Deploy!

### Step 3: Deploy Frontend to Vercel
1. Create another Vercel project from the same repo
2. Set **Root Directory** to `frontend`
3. Add Environment Variables:
   - `REACT_APP_API_URL` = `https://your-backend.vercel.app/api`
4. Deploy!

### Step 4: Update Backend CORS
Go back to your backend Vercel project → Settings → Environment Variables → update `FRONTEND_URL` with your actual frontend URL.

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| POST   | /api/auth/register  | Register user     |
| POST   | /api/auth/login     | Login             |
| GET    | /api/auth/me        | Get current user  |

### Profile
| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | /api/profile   | Get profile            |
| POST   | /api/profile   | Create/update profile  |
| PATCH  | /api/profile   | Partial update         |

### Meal Plan
| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| POST   | /api/meal-plan/generate    | Generate new meal plan   |
| GET    | /api/meal-plan/active      | Get active meal plan     |
| GET    | /api/meal-plan/today       | Get today's meals        |

### Food Log
| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| POST   | /api/food-log              | Add food entry           |
| GET    | /api/food-log/:date        | Get logs for date        |
| DELETE | /api/food-log/:id          | Delete entry             |

### Water
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/water         | Log water intake    |
| GET    | /api/water/:date   | Get daily total     |

### Progress
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/progress      | Log measurements    |
| GET    | /api/progress      | Get all entries     |
| GET    | /api/progress/latest | Get latest entry  |

---

## ✨ Features

- **Personalized Meal Plans** — 7-day plans based on BMI, TDEE, diet type, allergies, budget
- **50+ Indian Meal Options** — Dal Chawal, Poha, Paneer, Chicken, Fish etc.
- **Auto Macro Calculation** — BMR, TDEE, protein/carbs/fat targets
- **Food Diary** — Log meals with macro tracking, mood tagging
- **Water Tracker** — Visual bottle, quick-add buttons, daily log
- **Progress Tracker** — Weight + measurements over time with charts
- **Shopping List** — Auto-generated weekly grocery list
- **Budget Aware** — Plans optimized for your monthly spend (₹ INR)

---

## 📝 Notes

- The meal plan generator is rule-based (no external AI API needed — works offline!)
- Allergies filter out matching foods from the plan
- Non-veg diet includes all pure_veg + non_veg + egg options
- Budget shown is estimated — actual prices vary by city/market

---

Built with ❤️ using React + Express + MongoDB
