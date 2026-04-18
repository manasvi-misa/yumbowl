import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './FoodDiaryPage.css';

const MEAL_TYPES = ['breakfast','lunch','snack','dinner'];
const MOODS = ['energized','satisfied','neutral','hungry','bloated','guilty'];
const MOOD_EMOJI = { energized:'', satisfied:'', neutral:'', hungry:'', bloated:'', guilty:'' };

const blankEntry = { foodName:'', quantity:'1 serving', calories:0, protein:0, carbs:0, fats:0, mealType:'breakfast', mood:'satisfied', notes:'' };

export default function FoodDiaryPage() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({ calories:0, protein:0, carbs:0, fats:0 });
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankEntry);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchLogs = (d) => {
    setFetching(true);
    api.get(`/food-log/${d}`)
      .then(r => { setLogs(r.data.logs || []); setSummary(r.data.summary || {}); })
      .catch(() => {})
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    fetchLogs(date);
    api.get('/profile').then(r => setProfile(r.data)).catch(() => {});
  }, [date]);

  const set = (k,v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = async () => {
    if (!form.foodName.trim()) { toast.error('Food name is required'); return; }
    setLoading(true);
    try {
      await api.post('/food-log', { ...form, date,
        calories: Number(form.calories), protein: Number(form.protein),
        carbs: Number(form.carbs), fats: Number(form.fats) });
      toast.success('Food logged!');
      setShowForm(false);
      setForm(blankEntry);
      fetchLogs(date);
    } catch (err) { toast.error('Failed to log food'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/food-log/${id}`);
      toast.success('Entry removed');
      fetchLogs(date);
    } catch { toast.error('Failed to delete'); }
  };

  const byMeal = MEAL_TYPES.reduce((acc, m) => {
    acc[m] = logs.filter(l => l.mealType === m);
    return acc;
  }, {});

  return (
    <div className="food-diary animate-fade-up">
      <div className="section-header">
        <div>
          <h1>Food Diary</h1>
          <p style={{ marginTop:4 }}>Track every meal, every day</p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <input type="date" className="input" style={{ width:'auto' }} value={date} max={today} onChange={e => setDate(e.target.value)} />
          <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
            {showForm ? '✕ Cancel' : '+ Log Food'}
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="diary-summary">
        {[
          { label:'Calories', val: summary.calories || 0, unit:'kcal', max: profile?.targetCalories, color:'var(--accent)' },
          { label:'Protein',  val: summary.protein  || 0, unit:'g',    max: profile?.targetProtein,  color:'var(--orange)' },
          { label:'Carbs',    val: summary.carbs    || 0, unit:'g',    max: profile?.targetCarbs,    color:'var(--blue)' },
          { label:'Fats',     val: summary.fats     || 0, unit:'g',    max: profile?.targetFats,     color:'var(--purple)' },
        ].map(item => (
          <div key={item.label} className="summary-macro">
            <div className="sm-header">
              <span className="sm-label">{item.label}</span>
              <span className="sm-val mono" style={{ color: item.color }}>{item.val}<small>{item.unit}</small></span>
            </div>
            {item.max && (
              <div className="progress-bar-track" style={{ marginTop:6 }}>
                <div className="progress-bar-fill" style={{ width:`${Math.min(100,(item.val/item.max)*100)}%`, background: item.color }} />
              </div>
            )}
            {item.max && <div className="sm-sub">of {item.max}{item.unit}</div>}
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card log-form animate-fade-up">
          <h3 style={{ marginBottom:'1.5rem' }}>Log Food Entry</h3>
          <div className="log-form-grid">
            <div className="form-group" style={{ gridColumn:'1 / -1' }}>
              <label>Food Name *</label>
              <input className="input" placeholder="e.g. Dal Rice + Sabzi" value={form.foodName} onChange={e => set('foodName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Meal Type</label>
              <select className="select input" value={form.mealType} onChange={e => set('mealType', e.target.value)}>
                {MEAL_TYPES.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input className="input" placeholder="1 serving" value={form.quantity} onChange={e => set('quantity', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Calories (kcal)</label>
              <input className="input" type="number" min="0" placeholder="350" value={form.calories || ''} onChange={e => set('calories', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Protein (g)</label>
              <input className="input" type="number" min="0" placeholder="12" value={form.protein || ''} onChange={e => set('protein', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Carbs (g)</label>
              <input className="input" type="number" min="0" placeholder="45" value={form.carbs || ''} onChange={e => set('carbs', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fats (g)</label>
              <input className="input" type="number" min="0" placeholder="8" value={form.fats || ''} onChange={e => set('fats', e.target.value)} />
            </div>
            <div className="form-group" style={{ gridColumn:'1 / -1' }}>
              <label>How did you feel?</label>
              <div className="mood-picker">
                {MOODS.map(m => (
                  <button key={m} type="button" className={`mood-btn ${form.mood === m ? 'active' : ''}`} onClick={() => set('mood', m)}>
                    {MOOD_EMOJI[m]} {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ gridColumn:'1 / -1' }}>
              <label>Notes (optional)</label>
              <input className="input" placeholder="Any thoughts about this meal..." value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:'1rem' }}>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(blankEntry); }}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAdd} disabled={loading}>
              {loading ? 'Saving...' : '+ Add Entry'}
            </button>
          </div>
        </div>
      )}

      {/* Meal sections */}
      {fetching ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'3rem' }}><div className="spinner" style={{ width:36, height:36 }} /></div>
      ) : (
        <div className="diary-meals">
          {MEAL_TYPES.map(mealType => (
            <div key={mealType} className="diary-meal-section">
              <div className="dms-header">
                <span className="dms-title">
                  {mealType === 'breakfast' ? '' : mealType === 'lunch' ? '' : mealType === 'snack' ? '' : ''}
                  {' '}{mealType.charAt(0).toUpperCase()+mealType.slice(1)}
                </span>
                <span className="dms-kcal mono">
                  {byMeal[mealType].reduce((s,l) => s+(l.calories||0), 0)} kcal
                </span>
              </div>
              {byMeal[mealType].length === 0 ? (
                <div className="dms-empty">No entries yet</div>
              ) : (
                byMeal[mealType].map(log => (
                  <div key={log._id} className="log-entry">
                    <div className="le-main">
                      <div className="le-name">{log.foodName}</div>
                      <div className="le-meta">
                        <span>{log.quantity}</span>
                        {log.mood && <span className="mood-tag">{MOOD_EMOJI[log.mood]} {log.mood}</span>}
                        {log.notes && <span className="le-note">"{log.notes}"</span>}
                      </div>
                    </div>
                    <div className="le-macros">
                      <span className="mono">{log.calories} kcal</span>
                      <span className="mac-chip orange">P:{log.protein}g</span>
                      <span className="mac-chip blue">C:{log.carbs}g</span>
                      <span className="mac-chip purple">F:{log.fats}g</span>
                    </div>
                    <button className="btn btn-ghost le-del" onClick={() => handleDelete(log._id)} title="Delete">✕</button>
                  </div>
                ))
              )}
            </div>
          ))}
          {logs.length === 0 && !fetching && (
            <div className="card" style={{ textAlign:'center', padding:'3rem' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>-</div>
              <h3>Nothing logged yet</h3>
              <p>Click "Log Food" to add your first entry for {date === today ? 'today' : date}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
