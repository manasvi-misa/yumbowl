import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './OnboardingPage.css';

const STEPS = [
  { id: 1, title: 'Basic Info',       subtitle: 'Tell us about yourself' },
  { id: 2, title: 'Body Stats',       subtitle: 'Your physical measurements' },
  { id: 3, title: 'Diet Preferences', subtitle: 'What you eat and avoid' },
  { id: 4, title: 'Goals',            subtitle: 'What you want to achieve' },
  { id: 5, title: 'Lifestyle',        subtitle: 'Budget & meal preferences' },
];

const ALLERGIES_OPTIONS = ['Peanuts','Dairy','Gluten','Soy','Tree Nuts','Shellfish','Eggs','Fish','Sesame'];

const defaultForm = {
  age: '', gender: '', weight: '', height: '', goalWeight: '',
  dailySteps: 8000, activityLevel: 'moderate',
  dietType: '', allergies: [],
  goal: '', targetProtein: '', targetCalories: '',
  monthlyBudget: '', mealsPerDay: 3, waterIntakeGoal: 2.5
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleAllergy = allergy => {
    setForm(f => ({
      ...f,
      allergies: f.allergies.includes(allergy)
        ? f.allergies.filter(a => a !== allergy)
        : [...f.allergies, allergy]
    }));
  };

  const next = () => { if (step < 5) setStep(s => s + 1); };
  const prev = () => { if (step > 1) setStep(s => s - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/profile', {
        ...form,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
        goalWeight: Number(form.goalWeight),
        dailySteps: Number(form.dailySteps),
        targetProtein: form.targetProtein ? Number(form.targetProtein) : undefined,
        targetCalories: form.targetCalories ? Number(form.targetCalories) : undefined,
        monthlyBudget: Number(form.monthlyBudget),
        mealsPerDay: Number(form.mealsPerDay),
        waterIntakeGoal: Number(form.waterIntakeGoal),
      });
      // Auto-generate first meal plan
      await api.post('/meal-plan/generate');
      toast.success('Profile set up! Your meal plan is ready 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="onboarding-page">
      {/* Header */}
      <div className="onb-header">
        <div className="auth-logo" style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem' }}>
          <div className="logo-icon">Y</div>YumBowl
        </div>
        <div className="onb-progress-bar">
          <div className="onb-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="onb-step-count">{step} / {STEPS.length}</span>
      </div>

      {/* Card */}
      <div className="onb-card">
        <div className="onb-step-info">
          <span className="badge badge-accent">Step {step}</span>
          <h2>{STEPS[step-1].title}</h2>
          <p>{STEPS[step-1].subtitle}</p>
        </div>

        {/* Step 1 — Basic Info */}
        {step === 1 && (
          <div className="onb-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input className="input" type="number" min="10" max="100" placeholder="25" value={form.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="option-row">
                  {['male','female','other'].map(g => (
                    <button key={g} type="button" className={`option-btn ${form.gender === g ? 'active' : ''}`} onClick={() => set('gender', g)}>
                      {g === 'male' ? '♂ Male' : g === 'female' ? '♀ Female' : '⚧ Other'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Activity Level</label>
              <div className="option-row wrap">
                {[
                  { val: 'sedentary',   label: '🪑 Sedentary', desc: 'Desk job, little exercise' },
                  { val: 'light',       label: '🚶 Light',      desc: '1-3 days/week exercise' },
                  { val: 'moderate',    label: '🏃 Moderate',   desc: '3-5 days/week exercise' },
                  { val: 'active',      label: '💪 Active',     desc: '6-7 days/week exercise' },
                  { val: 'very_active', label: '🔥 Very Active',desc: 'Athlete / physical job' },
                ].map(opt => (
                  <button key={opt.val} type="button" className={`option-btn-card ${form.activityLevel === opt.val ? 'active' : ''}`} onClick={() => set('activityLevel', opt.val)}>
                    <span className="obc-label">{opt.label}</span>
                    <span className="obc-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Body Stats */}
        {step === 2 && (
          <div className="onb-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input className="input" type="number" min="30" max="250" step="0.1" placeholder="70" value={form.weight} onChange={e => set('weight', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input className="input" type="number" min="100" max="250" placeholder="170" value={form.height} onChange={e => set('height', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Goal Weight (kg)</label>
              <input className="input" type="number" min="30" max="250" step="0.1" placeholder="65" value={form.goalWeight} onChange={e => set('goalWeight', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Daily Steps (approx)</label>
              <input className="input" type="number" min="0" max="30000" step="500" placeholder="8000" value={form.dailySteps} onChange={e => set('dailySteps', e.target.value)} />
            </div>
            {form.weight && form.height && (
              <div className="bmi-preview">
                <span>BMI Preview:</span>
                <strong className="text-accent">
                  {(form.weight / ((form.height / 100) ** 2)).toFixed(1)}
                </strong>
                <span className="text-muted" style={{ fontSize:'0.8rem' }}>
                  {(() => {
                    const bmi = form.weight / ((form.height / 100) ** 2);
                    if (bmi < 18.5) return '(Underweight)';
                    if (bmi < 25) return '(Normal)';
                    if (bmi < 30) return '(Overweight)';
                    return '(Obese)';
                  })()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Diet Preferences */}
        {step === 3 && (
          <div className="onb-fields">
            <div className="form-group">
              <label>Diet Type</label>
              <div className="option-row wrap">
                {[
                  { val: 'pure_veg',      label: '🌿 Pure Vegetarian', desc: 'No meat, fish, or eggs' },
                  { val: 'veg_with_egg',  label: '🥚 Veg + Egg',       desc: 'Vegetarian but includes eggs' },
                  { val: 'non_veg',       label: '🍗 Non-Vegetarian',   desc: 'Includes meat, fish, poultry' },
                ].map(opt => (
                  <button key={opt.val} type="button" className={`option-btn-card ${form.dietType === opt.val ? 'active' : ''}`} onClick={() => set('dietType', opt.val)}>
                    <span className="obc-label">{opt.label}</span>
                    <span className="obc-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Allergies (select all that apply)</label>
              <div className="allergy-grid">
                {ALLERGIES_OPTIONS.map(a => (
                  <button key={a} type="button" className={`allergy-btn ${form.allergies.includes(a) ? 'active' : ''}`} onClick={() => toggleAllergy(a)}>
                    {form.allergies.includes(a) ? '✓ ' : ''}{a}
                  </button>
                ))}
              </div>
              {form.allergies.length === 0 && <p style={{ fontSize:'0.8rem', marginTop:8, color:'var(--text-muted)' }}>No allergies selected — that's fine!</p>}
            </div>
          </div>
        )}

        {/* Step 4 — Goals */}
        {step === 4 && (
          <div className="onb-fields">
            <div className="form-group">
              <label>Primary Goal</label>
              <div className="option-row wrap">
                {[
                  { val: 'weight_loss',  label: '⬇️ Weight Loss',    desc: 'Calorie deficit, burn fat' },
                  { val: 'muscle_gain',  label: '💪 Muscle Gain',    desc: 'Calorie surplus, build muscle' },
                  { val: 'maintenance',  label: '⚖️ Maintenance',    desc: 'Stay fit and healthy' },
                ].map(opt => (
                  <button key={opt.val} type="button" className={`option-btn-card ${form.goal === opt.val ? 'active' : ''}`} onClick={() => set('goal', opt.val)}>
                    <span className="obc-label">{opt.label}</span>
                    <span className="obc-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="onb-info-box">
              💡 We'll auto-calculate your optimal calories and macros. But you can override them below if you already know your targets.
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Target Calories/day (optional)</label>
                <input className="input" type="number" placeholder="Auto-calculated" value={form.targetCalories} onChange={e => set('targetCalories', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Target Protein g/day (optional)</label>
                <input className="input" type="number" placeholder="Auto-calculated" value={form.targetProtein} onChange={e => set('targetProtein', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Lifestyle */}
        {step === 5 && (
          <div className="onb-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Monthly Food Budget (₹)</label>
                <input className="input" type="number" min="1000" placeholder="5000" value={form.monthlyBudget} onChange={e => set('monthlyBudget', e.target.value)} />
                {form.monthlyBudget && (
                  <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginTop:4, display:'block' }}>
                    ≈ ₹{Math.round(form.monthlyBudget / 30)}/day
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Meals Per Day</label>
                <div className="option-row">
                  {[2,3,4,5,6].map(n => (
                    <button key={n} type="button" className={`option-btn ${form.mealsPerDay === n ? 'active' : ''}`} onClick={() => set('mealsPerDay', n)}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Daily Water Goal (Liters)</label>
              <div className="option-row">
                {[1.5,2,2.5,3,3.5,4].map(n => (
                  <button key={n} type="button" className={`option-btn ${form.waterIntakeGoal === n ? 'active' : ''}`} onClick={() => set('waterIntakeGoal', n)}>
                    {n}L
                  </button>
                ))}
              </div>
            </div>
            <div className="onb-summary">
              <h4>Profile Summary</h4>
              <div className="summary-grid">
                <div><span>Age</span><strong>{form.age} yrs</strong></div>
                <div><span>Weight</span><strong>{form.weight} kg</strong></div>
                <div><span>Height</span><strong>{form.height} cm</strong></div>
                <div><span>Goal</span><strong>{form.goal?.replace('_',' ')}</strong></div>
                <div><span>Diet</span><strong>{form.dietType?.replace(/_/g,' ')}</strong></div>
                <div><span>Budget</span><strong>₹{form.monthlyBudget}/mo</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="onb-nav">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={prev}>← Back</button>
          )}
          <div style={{ flex: 1 }} />
          {step < 5 ? (
            <button className="btn btn-primary" onClick={next}>Continue →</button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <><span className="spinner" style={{ width:18, height:18 }} /> Generating plan...</> : '🚀 Generate My Meal Plan'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
