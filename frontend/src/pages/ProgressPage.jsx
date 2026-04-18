import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './ProgressPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const chartOptions = (label, color) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1d27',
      borderColor: 'rgba(255,255,255,0.07)',
      borderWidth: 1,
      titleColor: '#f0f2f8',
      bodyColor: '#8b90a7',
      padding: 10,
    }
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4b5168', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4b5168', font: { size: 11 } } }
  }
});

const makeDataset = (data, color, label) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color.replace(')', ', 0.1)').replace('rgb', 'rgba'),
  tension: 0.4,
  fill: true,
  pointRadius: 4,
  pointBackgroundColor: color,
});

const blankForm = { date: new Date().toISOString().split('T')[0], weight:'', chest:'', waist:'', hips:'', arms:'', thighs:'', steps:'', notes:'' };

export default function ProgressPage() {
  const [entries, setEntries] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [loading, setLoading] = useState(false);
  const [activeChart, setActiveChart] = useState('weight');

  const fetchProgress = () => {
    api.get('/progress').then(r => setEntries(r.data || [])).catch(() => {});
    api.get('/profile').then(r => setProfile(r.data)).catch(() => {});
  };

  useEffect(() => { fetchProgress(); }, []);

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post('/progress', {
        ...form,
        weight: form.weight ? Number(form.weight) : undefined,
        chest: form.chest ? Number(form.chest) : undefined,
        waist: form.waist ? Number(form.waist) : undefined,
        hips: form.hips ? Number(form.hips) : undefined,
        arms: form.arms ? Number(form.arms) : undefined,
        thighs: form.thighs ? Number(form.thighs) : undefined,
        steps: form.steps ? Number(form.steps) : undefined,
      });
      toast.success('Progress logged!');
      setShowForm(false);
      setForm(blankForm);
      fetchProgress();
    } catch { toast.error('Failed to save progress'); }
    finally { setLoading(false); }
  };

  const labels = entries.map(e => new Date(e.date).toLocaleDateString('en-IN', { day:'numeric', month:'short' }));

  const chartConfigs = {
    weight: { data: entries.map(e => e.weight), color: 'rgb(163,230,53)', label:'Weight (kg)' },
    waist:  { data: entries.map(e => e.waist),  color: 'rgb(251,146,60)', label:'Waist (cm)' },
    steps:  { data: entries.map(e => e.steps),  color: 'rgb(96,165,250)', label:'Steps' },
  };

  const latest = entries[entries.length - 1];
  const first  = entries[0];
  const weightChange = latest?.weight && first?.weight ? (latest.weight - first.weight).toFixed(1) : null;

  return (
    <div className="progress-page animate-fade-up">
      <div className="section-header">
        <div>
          <h1>Progress</h1>
          <p style={{ marginTop:4 }}>Track your transformation over time</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Cancel' : '+ Log Progress'}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid-4" style={{ marginBottom:'1.5rem' }}>
        <div className="card stat-card">
          <div className="stat-icon">⚖️</div>
          <div className="stat-num mono">{latest?.weight || profile?.weight || '—'}<small>kg</small></div>
          <div className="stat-name">Current Weight</div>
          <div className="stat-sub">Goal: {profile?.goalWeight || '—'} kg</div>
        </div>
        <div className="card stat-card orange">
          <div className="stat-icon">{weightChange !== null ? (weightChange <= 0 ? '📉' : '📈') : '📊'}</div>
          <div className="stat-num mono" style={{ color: weightChange <= 0 ? 'var(--accent)' : 'var(--red)' }}>
            {weightChange !== null ? `${weightChange > 0 ? '+' : ''}${weightChange}` : '—'}<small>kg</small>
          </div>
          <div className="stat-name">Total Change</div>
          <div className="stat-sub">Since first entry</div>
        </div>
        <div className="card stat-card blue">
          <div className="stat-icon">📐</div>
          <div className="stat-num mono">{latest?.waist || '—'}<small>cm</small></div>
          <div className="stat-name">Waist</div>
          <div className="stat-sub">Latest measurement</div>
        </div>
        <div className="card stat-card purple">
          <div className="stat-icon">🚶</div>
          <div className="stat-num mono">{latest?.steps?.toLocaleString() || '—'}</div>
          <div className="stat-name">Latest Steps</div>
          <div className="stat-sub">Goal: {profile?.dailySteps?.toLocaleString() || '—'}</div>
        </div>
      </div>

      {/* Log form */}
      {showForm && (
        <div className="card log-form animate-fade-up" style={{ marginBottom:'1.5rem' }}>
          <h3 style={{ marginBottom:'1.5rem' }}>Log Today's Progress</h3>
          <div className="progress-form-grid">
            <div className="form-group">
              <label>Date</label>
              <input className="input" type="date" value={form.date} onChange={e => set('date',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input className="input" type="number" step="0.1" placeholder="72.5" value={form.weight} onChange={e => set('weight',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Chest (cm)</label>
              <input className="input" type="number" step="0.5" placeholder="95" value={form.chest} onChange={e => set('chest',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Waist (cm)</label>
              <input className="input" type="number" step="0.5" placeholder="80" value={form.waist} onChange={e => set('waist',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Hips (cm)</label>
              <input className="input" type="number" step="0.5" placeholder="95" value={form.hips} onChange={e => set('hips',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Arms (cm)</label>
              <input className="input" type="number" step="0.5" placeholder="32" value={form.arms} onChange={e => set('arms',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Thighs (cm)</label>
              <input className="input" type="number" step="0.5" placeholder="55" value={form.thighs} onChange={e => set('thighs',e.target.value)} />
            </div>
            <div className="form-group">
              <label>Steps Today</label>
              <input className="input" type="number" placeholder="8500" value={form.steps} onChange={e => set('steps',e.target.value)} />
            </div>
            <div className="form-group" style={{ gridColumn:'1 / -1' }}>
              <label>Notes</label>
              <input className="input" placeholder="How are you feeling? Any observations..." value={form.notes} onChange={e => set('notes',e.target.value)} />
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:'1rem' }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Entry'}
            </button>
          </div>
        </div>
      )}

      {/* Charts */}
      {entries.length > 0 ? (
        <>
          <div className="chart-tabs">
            {Object.entries(chartConfigs).map(([key, cfg]) => (
              <button key={key} className={`plan-tab ${activeChart === key ? 'active' : ''}`} onClick={() => setActiveChart(key)}>
                {cfg.label}
              </button>
            ))}
          </div>
          <div className="card chart-card">
            <h3 style={{ marginBottom:'1.5rem' }}>{chartConfigs[activeChart].label} Over Time</h3>
            <div style={{ height: 280 }}>
              <Line
                data={{
                  labels,
                  datasets: [makeDataset(chartConfigs[activeChart].data, chartConfigs[activeChart].color, chartConfigs[activeChart].label)]
                }}
                options={chartOptions(chartConfigs[activeChart].label, chartConfigs[activeChart].color)}
              />
            </div>
          </div>

          {/* Log table */}
          <div className="card">
            <h3 style={{ marginBottom:'1.25rem' }}>History</h3>
            <div className="progress-table-wrap">
              <table className="progress-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weight</th>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Arms</th>
                    <th>Steps</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[...entries].reverse().map((e, i) => (
                    <tr key={i}>
                      <td>{new Date(e.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'2-digit' })}</td>
                      <td className="mono">{e.weight ? `${e.weight}kg` : '—'}</td>
                      <td className="mono">{e.chest ? `${e.chest}cm` : '—'}</td>
                      <td className="mono">{e.waist ? `${e.waist}cm` : '—'}</td>
                      <td className="mono">{e.hips  ? `${e.hips}cm`  : '—'}</td>
                      <td className="mono">{e.arms  ? `${e.arms}cm`  : '—'}</td>
                      <td className="mono">{e.steps ? e.steps.toLocaleString() : '—'}</td>
                      <td style={{ color:'var(--text-muted)', fontStyle:'italic', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign:'center', padding:'4rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📈</div>
          <h3>No progress entries yet</h3>
          <p style={{ marginBottom:'1.5rem' }}>Start logging your weight and measurements to track your transformation.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Log First Entry</button>
        </div>
      )}
    </div>
  );
}
