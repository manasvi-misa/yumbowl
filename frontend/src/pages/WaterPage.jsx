import api from '../utils/api';
import toast from 'react-hot-toast';
import './WaterPage.css';

const QUICK_AMOUNTS = [0.25, 0.33, 0.5, 0.75, 1];

export default function WaterPage() {
  const today = new Date().toISOString().split('T')[0];
  const [total, setTotal] = useState(0);
  const [logs, setLogs] = useState([]);
  const [goal, setGoal] = useState(2.5);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    api.get(`/water/${today}`).then(r => { setTotal(r.data.total || 0); setLogs(r.data.logs || []); }).catch(() => {});
    api.get('/profile').then(r => setGoal(r.data.waterIntakeGoal || 2.5)).catch(() => {});
  };


  const addWater = async (amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { toast.error('Enter a valid amount'); return; }
    setLoading(true);
    try {
      await api.post('/water', { date: today, amount: amt });
      toast.success(`+${amt}L logged 💧`);
      setCustom('');
      fetch();
    } catch { toast.error('Failed to log water'); }
    finally { setLoading(false); }
  };

  const pct = Math.min(100, Math.round((total / goal) * 100));
  const cups = Math.round(total / 0.25); // 250ml cups

  // Render water droplets
  const totalDroplets = 8;
  const filledDroplets = Math.round((pct / 100) * totalDroplets);

  return (
    <div className="water-page animate-fade-up">
      <div className="section-header">
        <div>
          <h1>Water Tracker</h1>
          <p style={{ marginTop:4 }}>Stay hydrated — goal: {goal}L per day</p>
        </div>
      </div>

      <div className="water-main-grid">
        {/* Big visual */}
        <div className="card water-visual-card">
          <div className="water-bottle">
            <div className="bottle-cap" />
            <div className="bottle-body">
              <div className="bottle-fill" style={{ height: `${pct}%` }}>
                <div className="bottle-wave" />
              </div>
              <div className="bottle-text">
                <span className="bottle-pct mono">{pct}%</span>
                <span className="bottle-total mono">{total.toFixed(2)}L</span>
                <span className="bottle-goal">of {goal}L</span>
              </div>
            </div>
          </div>

          <div className="water-stats">
            <div className="wstat"><span>Consumed</span><strong className="mono">{total.toFixed(2)}L</strong></div>
            <div className="wstat"><span>Remaining</span><strong className="mono">{Math.max(0, goal - total).toFixed(2)}L</strong></div>
            <div className="wstat"><span>Cups (~250ml)</span><strong className="mono">{cups}</strong></div>
          </div>

          {/* Droplet progress */}
          <div className="droplet-row">
            {Array.from({ length: totalDroplets }).map((_, i) => (
              <div key={i} className={`droplet ${i < filledDroplets ? 'filled' : ''}`}>💧</div>
            ))}
          </div>

          {pct >= 100 && (
            <div className="goal-achieved">Daily goal achieved! Great job!</div>
          )}
        </div>

        {/* Controls */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          <div className="card">
            <h3 style={{ marginBottom:'1rem' }}>Quick Add</h3>
            <div className="quick-water-grid">
              {QUICK_AMOUNTS.map(amt => (
                <button key={amt} className="quick-water-btn" onClick={() => addWater(amt)} disabled={loading}>
                  <span className="qwb-icon">💧</span>
                  <span className="qwb-amount mono">{amt}L</span>
                  <span className="qwb-sub">{amt * 1000}ml</span>
                </button>
              ))}
            </div>
            <div className="custom-water">
              <input
                className="input"
                type="number"
                step="0.05"
                min="0.05"
                max="2"
                placeholder="Custom amount (L)"
                value={custom}
                onChange={e => setCustom(e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => addWater(custom)} disabled={!custom || loading}>
                + Add
              </button>
            </div>
          </div>

          {/* Today's log */}
          <div className="card">
            <h3 style={{ marginBottom:'1rem' }}>Today's Log</h3>
            {logs.length === 0 ? (
              <div className="empty-state" style={{ padding:'2rem 1rem' }}>
                <span>💧</span>
                <p>No water logged yet today</p>
              </div>
            ) : (
              <div className="water-log-list">
                {[...logs].reverse().map((log, i) => (
                  <div key={i} className="water-log-item">
                    <span className="wli-icon">💧</span>
                    <span className="wli-amount mono">{log.amount}L</span>
                    <span className="wli-time">{new Date(log.loggedAt).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="card water-tips">
            <h3 style={{ marginBottom:'1rem' }}>Hydration Tips 💡</h3>
            {[
              'Drink a glass right after waking up.',
              'Keep a water bottle at your desk.',
              'Drink before every meal to aid digestion.',
              'Add lemon or cucumber for flavor.',
              'Set hourly reminders on your phone.',
            ].map((tip, i) => (
              <div key={i} className="tip-item">
                <span className="tip-num">{i+1}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
