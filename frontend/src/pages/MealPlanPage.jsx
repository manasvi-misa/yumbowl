import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './MealPlanPage.css';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function MealPlanPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeDay, setActiveDay] = useState(() => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date().getDay()];
  });
  const [activeTab, setActiveTab] = useState('plan');

  const fetchPlan = () => {
    setLoading(true);
    api.get('/meal-plan/active')
      .then(r => setPlan(r.data))
      .catch(() => setPlan(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPlan(); }, []);

  const generate = async () => {
    setGenerating(true);
    try {
      const r = await api.post('/meal-plan/generate');
      setPlan(r.data);
      toast.success('New meal plan generated!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate plan');
    } finally {
      setGenerating(false);
    }
  };

  const currentDayPlan = plan?.weekPlan?.find(d => d.day === activeDay);

  if (loading) return <div style={{ display:'flex', justifyContent:'center', paddingTop:'4rem' }}><div className="spinner" style={{ width:40, height:40 }} /></div>;

  return (
    <div className="meal-plan-page animate-fade-up">
      <div className="section-header">
        <div>
          <h1>Meal Plan</h1>
          <p style={{ marginTop:4 }}>Your personalized weekly nutrition plan</p>
        </div>
        <button className="btn btn-primary" onClick={generate} disabled={generating}>
          {generating ? <><span className="spinner" style={{ width:16, height:16 }} /> Generating...</> : '🔄 Regenerate Plan'}
        </button>
      </div>

      {!plan ? (
        <div className="card" style={{ textAlign:'center', padding:'4rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>-</div>
          <h3>No meal plan yet</h3>
          <p style={{ marginBottom:'1.5rem' }}>Generate your personalized weekly meal plan based on your profile.</p>
          <button className="btn btn-primary btn-lg" onClick={generate} disabled={generating}>
            {generating ? 'Generating...' : ' Generate My Meal Plan'}
          </button>
        </div>
      ) : (
        <>
          {/* Plan meta */}
          <div className="plan-meta-bar">
            <div className="plan-meta-item">
              <span>Weekly Cost</span>
              <strong className="text-accent">₹{plan.totalWeeklyCost}</strong>
            </div>
            <div className="plan-meta-item">
              <span>Daily Cost</span>
              <strong>≈ ₹{Math.round(plan.totalWeeklyCost / 7)}</strong>
            </div>
            <div className="plan-meta-item">
              <span>Generated</span>
              <strong>{new Date(plan.generatedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</strong>
            </div>
          </div>

          {/* Tabs */}
          <div className="plan-tabs">
            <button className={`plan-tab ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => setActiveTab('plan')}>Weekly Plan</button>
            <button className={`plan-tab ${activeTab === 'shopping' ? 'active' : ''}`} onClick={() => setActiveTab('shopping')}>Shopping List</button>
          </div>

          {activeTab === 'plan' && (
            <>
              {/* Day picker */}
              <div className="day-picker">
                {DAYS.map(day => (
                  <button key={day} className={`day-btn ${activeDay === day ? 'active' : ''}`} onClick={() => setActiveDay(day)}>
                    <span className="day-short">{day.slice(0,3)}</span>
                    {plan.weekPlan.find(d => d.day === day) && (
                      <span className="day-cals mono">{plan.weekPlan.find(d => d.day === day).totalCalories}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Day summary */}
              {currentDayPlan && (
                <>
                  <div className="day-summary">
                    <div className="ds-item"><span>Calories</span><strong className="mono">{currentDayPlan.totalCalories}</strong></div>
                    <div className="ds-item orange"><span>Protein</span><strong className="mono">{currentDayPlan.totalProtein}g</strong></div>
                    <div className="ds-item blue"><span>Carbs</span><strong className="mono">{currentDayPlan.totalCarbs}g</strong></div>
                    <div className="ds-item purple"><span>Fats</span><strong className="mono">{currentDayPlan.totalFats}g</strong></div>
                    <div className="ds-item"><span>Est. Cost</span><strong className="mono">₹{currentDayPlan.dailyCost}</strong></div>
                  </div>

                  <div className="meals-grid">
                    {currentDayPlan.meals.map((meal, i) => (
                      <div key={i} className="meal-card">
                        <div className="meal-card-header">
                          <div className="meal-header-left">
                            <span className="meal-tag">{meal.mealName}</span>
                            <span className="meal-card-time">{meal.time}</span>
                          </div>
                          <div className="meal-card-kcal mono">{meal.totalCalories} kcal</div>
                        </div>
                        {meal.items?.map((item, j) => (
                          <div key={j} className="meal-item-detail">
                            <div className="meal-item-name">-{item.name}</div>
                            <div className="meal-item-macros">
                              <span className="mac-chip orange">P: {item.protein}g</span>
                              <span className="mac-chip blue">C: {item.carbs}g</span>
                              <span className="mac-chip purple">F: {item.fats}g</span>
                              <span className="mac-chip">⏱ {item.prepTime} min</span>
                              <span className="mac-chip">₹{item.estimatedCost}</span>
                            </div>
                            <div className="meal-recipe">
                              <span className="recipe-label">Recipe: </span>{item.recipe}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'shopping' && (
            <div className="shopping-list">
              <div className="shopping-header">
                <h3>Weekly Shopping List</h3>
                <p>Everything you need for this week's meal plan</p>
              </div>
              {Object.entries(
                (plan.shoppingList || []).reduce((acc, item) => {
                  const cat = item.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(item);
                  return acc;
                }, {})
              ).map(([cat, items]) => (
                <div key={cat} className="shopping-category">
                  <div className="shopping-cat-header">{cat}</div>
                  {items.map((item, i) => (
                    <div key={i} className="shopping-item">
                      <div className="shopping-check" />
                      <span className="shopping-name">{item.item}</span>
                      <span className="shopping-qty">{item.quantity}</span>
                      <span className="shopping-cost mono">₹{item.estimatedCost}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="shopping-total">
                <span>Estimated Total</span>
                <strong className="mono text-accent">
                  ₹{(plan.shoppingList || []).reduce((s, i) => s + (i.estimatedCost || 0), 0)}
                </strong>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
