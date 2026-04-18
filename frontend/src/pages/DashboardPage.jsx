import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import './DashboardPage.css';

function MacroRing({ label, value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100)) || 0;
  return (
    <div className="macro-ring-item">
      <div className="macro-ring-outer" style={{ '--ring-color': color }}>
        <svg viewBox="0 0 64 64" className="macro-svg">
          <circle cx="32" cy="32" r="28" className="ring-bg" />
          <circle
            cx="32" cy="32" r="28"
            className="ring-fill"
            style={{
              strokeDasharray: `${pct * 1.759} 175.9`,
              stroke: color
            }}
          />
        </svg>
        <div className="ring-center">
          <span className="ring-val">{value}<small>g</small></span>
        </div>
      </div>
      <span className="ring-label">{label}</span>
      <span className="ring-sub">{pct}% of {max}g</span>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [todayLog, setTodayLog] = useState({ logs: [], summary: { calories:0, protein:0, carbs:0, fats:0 } });
  const [todayMeals, setTodayMeals] = useState(null);
  const [water, setWater] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    Promise.all([
      api.get('/profile').catch(() => null),
      api.get(`/food-log/${today}`).catch(() => null),
      api.get('/meal-plan/today').catch(() => null),
      api.get(`/water/${today}`).catch(() => null),
    ]).then(([p, fl, tm, w]) => {
      if (p) setProfile(p.data);
      if (fl) setTodayLog(fl.data);
      if (tm) setTodayMeals(tm.data);
      if (w) setWater(w.data);
    }).finally(() => setLoading(false));
  }, [today]);

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', paddingTop:'4rem' }}>
      <div className="spinner" style={{ width:40, height:40 }} />
    </div>
  );

  const calLeft = (profile?.targetCalories || 2000) - (todayLog.summary?.calories || 0);
  const waterGoal = profile?.waterIntakeGoal || 2.5;
  const waterPct = Math.min(100, Math.round((water.total / waterGoal) * 100));

  return (
    <div className="dashboard animate-fade-up">
      {/* Page header */}
      <div className="dash-header">
        <div>
          <h1>{greeting()}, {user?.name?.split(' ')[0]}</h1>
          <p style={{ marginTop:4 }}>
            {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
          </p>
        </div>
        {!profile && (
          <Link to="/onboarding" className="btn btn-primary">Complete Profile →</Link>
        )}
      </div>

      {/* Top stat cards */}
      <div className="grid-4" style={{ marginBottom:'2rem' }}>
        <div className="card stat-card">
          <div className="stat-icon">-</div>
          <div className="stat-num mono">{calLeft > 0 ? calLeft : 0}</div>
          <div className="stat-name">Calories Left</div>
          <div className="progress-bar-track" style={{ marginTop:8 }}>
            <div className="progress-bar-fill" style={{ width:`${Math.min(100,(todayLog.summary?.calories / (profile?.targetCalories||2000))*100)}%` }} />
          </div>
          <div className="stat-sub">{todayLog.summary?.calories || 0} / {profile?.targetCalories || '—'} kcal</div>
        </div>
        <div className="card stat-card orange">
          <div className="stat-icon">-</div>
          <div className="stat-num mono">{water.total?.toFixed(1) || '0.0'}L</div>
          <div className="stat-name">Water Today</div>
          <div className="progress-bar-track" style={{ marginTop:8 }}>
            <div className="progress-bar-fill" style={{ width:`${waterPct}%`, background:'var(--blue)' }} />
          </div>
          <div className="stat-sub">Goal: {waterGoal}L</div>
        </div>
        <div className="card stat-card blue">
          <div className="stat-icon">-</div>
          <div className="stat-num mono">{todayLog.summary?.protein || 0}g</div>
          <div className="stat-name">Protein Today</div>
          <div className="progress-bar-track" style={{ marginTop:8 }}>
            <div className="progress-bar-fill" style={{ width:`${Math.min(100,((todayLog.summary?.protein||0)/(profile?.targetProtein||100))*100)}%`, background:'var(--orange)' }} />
          </div>
          <div className="stat-sub">Target: {profile?.targetProtein || '—'}g</div>
        </div>
        <div className="card stat-card purple">
          <div className="stat-icon">-</div>
          <div className="stat-num mono">{profile?.weight || '—'}<small style={{ fontSize:'0.875rem' }}>kg</small></div>
          <div className="stat-name">Current Weight</div>
          <div className="stat-sub" style={{ marginTop:8 }}>Goal: {profile?.goalWeight || '—'} kg</div>
        </div>
      </div>

      {/* Main grid */}
      <div className="dash-main-grid">
        {/* Today's meals */}
        <div className="card dash-meals-card">
          <div className="section-header">
            <h3>Today's Plan</h3>
            <Link to="/meal-plan" className="btn btn-ghost" style={{ fontSize:'0.8125rem' }}>View full plan →</Link>
          </div>
          {todayMeals?.plan?.meals ? (
            <div className="today-meals">
              {todayMeals.plan.meals.map((meal, i) => (
                <div key={i} className="today-meal-item">
                  <div className="meal-time-badge">{meal.time}</div>
                  <div className="meal-info">
                    <span className="meal-type">{meal.mealName}</span>
                    <span className="meal-dish">{meal.items?.[0]?.name}</span>
                  </div>
                  <div className="meal-kcal mono">{meal.totalCalories} kcal</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>-</span>
              <p>No meal plan yet. <Link to="/meal-plan">Generate one →</Link></p>
            </div>
          )}
        </div>

        {/* Macro breakdown */}
        <div className="card">
          <div className="section-header"><h3>Macros Today</h3></div>
          <div className="macro-rings">
            <MacroRing label="Protein" value={todayLog.summary?.protein || 0} max={profile?.targetProtein || 100} color="var(--orange)" />
            <MacroRing label="Carbs"   value={todayLog.summary?.carbs   || 0} max={profile?.targetCarbs   || 250} color="var(--blue)" />
            <MacroRing label="Fats"    value={todayLog.summary?.fats    || 0} max={profile?.targetFats    || 65}  color="var(--purple)" />
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-actions">
        <h3 style={{ marginBottom:'1rem' }}>Quick Actions</h3>
        <div className="qa-grid">
          <Link to="/food-diary" className="qa-item">
            <span>-</span>
            <span>Log Food</span>
          </Link>
          <Link to="/water" className="qa-item">
            <span>-</span>
            <span>Log Water</span>
          </Link>
          <Link to="/progress" className="qa-item">
            <span>-</span>
            <span>Log Weight</span>
          </Link>
          <Link to="/meal-plan" className="qa-item">
            <span>-</span>
            <span>View Meal Plan</span>
          </Link>
        </div>
      </div>

      {/* Profile stats strip */}
      {profile && (
        <div className="card profile-strip" style={{ marginTop:'1.5rem' }}>
          <div className="ps-item"><span>BMI</span><strong className="mono">{profile.bmi}</strong></div>
          <div className="ps-divider" />
          <div className="ps-item"><span>BMR</span><strong className="mono">{profile.bmr} kcal</strong></div>
          <div className="ps-divider" />
          <div className="ps-item"><span>TDEE</span><strong className="mono">{profile.tdee} kcal</strong></div>
          <div className="ps-divider" />
          <div className="ps-item"><span>Diet Goal</span><strong>{profile.goal?.replace('_',' ')}</strong></div>
          <div className="ps-divider" />
          <div className="ps-item"><span>Diet Type</span><strong>{profile.dietType?.replace(/_/g,' ')}</strong></div>
          <div className="ps-divider" />
          <div className="ps-item"><span>Budget</span><strong>₹{profile.monthlyBudget}/mo</strong></div>
        </div>
      )}
    </div>
  );
}
