import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api.get('/profile')
      .then(r => { setProfile(r.data); setForm(r.data); })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const set = (k,v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setLoading(true);
    try {
      const r = await api.patch('/profile', {
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
        goalWeight: Number(form.goalWeight),
        dailySteps: Number(form.dailySteps),
        monthlyBudget: Number(form.monthlyBudget),
        waterIntakeGoal: Number(form.waterIntakeGoal),
        mealsPerDay: Number(form.mealsPerDay),
        activityLevel: form.activityLevel,
        dietType: form.dietType,
        goal: form.goal,
        allergies: form.allergies,
        targetProtein: form.targetProtein ? Number(form.targetProtein) : undefined,
        targetCalories: form.targetCalories ? Number(form.targetCalories) : undefined,
      });
      setProfile(r.data);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update profile'); }
    finally { setLoading(false); }
  };

  if (fetching) return <div style={{ display:'flex', justifyContent:'center', paddingTop:'4rem' }}><div className="spinner" style={{ width:40, height:40 }} /></div>;
  if (!form) return <div className="card" style={{ padding:'3rem', textAlign:'center' }}><p>No profile found. Complete onboarding first.</p></div>;

  const initials = user?.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="profile-page animate-fade-up">
      <div className="section-header">
        <div>
          <h1>Profile Settings</h1>
          <p style={{ marginTop:4 }}>Manage your personal information and preferences</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : '💾 Save Changes'}
        </button>
      </div>

      {/* User card */}
      <div className="card user-header-card">
        <div className="uhc-avatar">{initials}</div>
        <div>
          <h3>{user?.name}</h3>
          <p style={{ color:'var(--text-muted)', fontSize:'0.875rem' }}>{user?.email}</p>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
          <div className="uhc-stat"><span>BMI</span><strong className="mono">{profile?.bmi}</strong></div>
          <div className="uhc-stat"><span>BMR</span><strong className="mono">{profile?.bmr} kcal</strong></div>
          <div className="uhc-stat"><span>TDEE</span><strong className="mono">{profile?.tdee} kcal</strong></div>
          <div className="uhc-stat"><span>Target Cal</span><strong className="mono">{profile?.targetCalories} kcal</strong></div>
        </div>
      </div>

      <div className="profile-sections">
        {/* Basic Info */}
        <div className="card profile-section">
          <h3 className="ps-title">Basic Information</h3>
          <div className="profile-grid">
            <div className="form-group">
              <label>Age</label>
              <input className="input" type="number" value={form.age || ''} onChange={e => set('age',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select className="input select" value={form.gender || ''} onChange={e => set('gender',e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Activity Level</label>
              <select className="input select" value={form.activityLevel || ''} onChange={e => set('activityLevel',e.target.value)}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>
            <div className="form-group">
              <label>Daily Steps Goal</label>
              <input className="input" type="number" value={form.dailySteps || ''} onChange={e => set('dailySteps',e.target.value)} />
            </div>
          </div>
        </div>

        {/* Body Stats */}
        <div className="card profile-section">
          <h3 className="ps-title">Body Measurements</h3>
          <div className="profile-grid">
            <div className="form-group">
              <label>Current Weight (kg)</label>
              <input className="input" type="number" step="0.1" value={form.weight || ''} onChange={e => set('weight',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input className="input" type="number" value={form.height || ''} onChange={e => set('height',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Goal Weight (kg)</label>
              <input className="input" type="number" step="0.1" value={form.goalWeight || ''} onChange={e => set('goalWeight',e.target.value)} />
            </div>
          </div>
        </div>

        {/* Diet */}
        <div className="card profile-section">
          <h3 className="ps-title">Diet & Goals</h3>
          <div className="profile-grid">
            <div className="form-group">
              <label>Diet Type</label>
              <select className="input select" value={form.dietType || ''} onChange={e => set('dietType',e.target.value)}>
                <option value="pure_veg">Pure Vegetarian</option>
                <option value="veg_with_egg">Veg + Egg</option>
                <option value="non_veg">Non-Vegetarian</option>
              </select>
            </div>
            <div className="form-group">
              <label>Goal</label>
              <select className="input select" value={form.goal || ''} onChange={e => set('goal',e.target.value)}>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Calories (kcal/day)</label>
              <input className="input" type="number" value={form.targetCalories || ''} onChange={e => set('targetCalories',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Target Protein (g/day)</label>
              <input className="input" type="number" value={form.targetProtein || ''} onChange={e => set('targetProtein',e.target.value)} />
            </div>
          </div>
          <div className="form-group" style={{ marginTop:'1rem' }}>
            <label>Allergies (comma separated)</label>
            <input className="input" placeholder="e.g. Peanuts, Dairy" value={(form.allergies || []).join(', ')}
              onChange={e => set('allergies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
          </div>
        </div>

        {/* Lifestyle */}
        <div className="card profile-section">
          <h3 className="ps-title">Lifestyle & Budget</h3>
          <div className="profile-grid">
            <div className="form-group">
              <label>Monthly Food Budget (₹)</label>
              <input className="input" type="number" value={form.monthlyBudget || ''} onChange={e => set('monthlyBudget',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Meals Per Day</label>
              <select className="input select" value={form.mealsPerDay || 3} onChange={e => set('mealsPerDay',e.target.value)}>
                {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} meals</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Water Goal (Liters/day)</label>
              <input className="input" type="number" step="0.25" value={form.waterIntakeGoal || ''} onChange={e => set('waterIntakeGoal',e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Computed box */}
      <div className="card computed-box">
        <h3 style={{ marginBottom:'1rem' }}>Computed Metrics</h3>
        <p style={{ marginBottom:'1.25rem', fontSize:'0.875rem' }}>These are auto-calculated from your profile. They update when you save changes.</p>
        <div className="computed-grid">
          {[
            { label:'BMI',             val: profile?.bmi,            unit:'',     desc: profile?.bmi < 18.5 ? 'Underweight' : profile?.bmi < 25 ? 'Normal' : profile?.bmi < 30 ? 'Overweight' : 'Obese' },
            { label:'BMR',             val: profile?.bmr,            unit:'kcal', desc: 'Basal Metabolic Rate' },
            { label:'TDEE',            val: profile?.tdee,           unit:'kcal', desc: 'Total Daily Energy Expenditure' },
            { label:'Target Calories', val: profile?.targetCalories, unit:'kcal', desc: 'Daily calorie target' },
            { label:'Target Protein',  val: profile?.targetProtein,  unit:'g',    desc: 'Daily protein target' },
            { label:'Target Carbs',    val: profile?.targetCarbs,    unit:'g',    desc: 'Daily carbs target' },
            { label:'Target Fats',     val: profile?.targetFats,     unit:'g',    desc: 'Daily fats target' },
          ].map(m => (
            <div key={m.label} className="computed-item">
              <span className="ci-label">{m.label}</span>
              <strong className="ci-val mono">{m.val}{m.unit}</strong>
              <span className="ci-desc">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
