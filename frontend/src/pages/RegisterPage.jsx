import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import './AuthPages.css';

const STEPS_PREVIEW = [
  { icon: '👤', label: 'Basic info', done: true },
  { icon: '📏', label: 'Body stats', done: true },
  { icon: '🥗', label: 'Diet prefs', done: false },
  { icon: '🎯', label: 'Set goals', done: false },
];

const FLOATERS = [
  { emoji: '🥘', x: 8,   y: 12,  size: 2.6, delay: 0,   dur: 8 },
  { emoji: '🍱', x: 80,  y: 7,   size: 2.0, delay: 1,   dur: 7 },
  { emoji: '🥕', x: 90,  y: 45,  size: 1.7, delay: 0.7, dur: 9 },
  { emoji: '🍳', x: 15,  y: 75,  size: 2.3, delay: 2,   dur: 7 },
  { emoji: '🫛', x: 60,  y: 82,  size: 1.8, delay: 1.3, dur: 8 },
  { emoji: '🧅', x: 78,  y: 68,  size: 1.5, delay: 0.4, dur: 6 },
  { emoji: '🌾', x: 35,  y: 25,  size: 1.6, delay: 2.5, dur: 9 },
  { emoji: '🫚', x: 5,   y: 48,  size: 1.4, delay: 1.8, dur: 7 },
  { emoji: '🥣', x: 55,  y: 50,  size: 2.2, delay: 0.9, dur: 8 },
  { emoji: '🌶️', x: 25,  y: 90,  size: 1.6, delay: 0.2, dur: 6 },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name     = 'Name is required';
    if (!form.email.trim())      e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password)          e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min. 6 characters';
    if (form.password !== form.confirm) e.confirm  = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim().toLowerCase(), form.password);
      toast.success("Account created! Let's set up your plan 🎉");
      navigate('/onboarding');
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed. Is backend running?";
      toast.error(msg);
      if (msg.toLowerCase().includes('email')) setErrors(e => ({ ...e, email: msg }));
    } finally { setLoading(false); }
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6)  s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(4, s);
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#f87171', '#fbbf24', '#60a5fa', '#a3e635'];

  return (
    <div className={`auth-split auth-split--register ${mounted ? 'auth-split--in' : ''}`}>

      {/* ══ LEFT PANEL ══ */}
      <div className="auth-panel auth-panel--left" aria-hidden="true">
        <div className="apl-mesh apl-mesh--register" />
        <div className="apl-grid" />
        <div className="apl-floaters">
          {FLOATERS.map((f, i) => (
            <span key={i} className="apl-floater" style={{
              left: `${f.x}%`, top: `${f.y}%`,
              fontSize: `${f.size}rem`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
            }}>{f.emoji}</span>
          ))}
        </div>

        <div className="apl-center">
          <Link to="/" className="apl-logo">
            <div className="apl-logo__icon">Y</div>
            <span className="apl-logo__text">YumBowl</span>
          </Link>

          <h1 className="apl-headline">
            Your plan,<br />
            <span className="apl-headline__grad apl-headline__grad--orange">your rules.</span>
          </h1>
          <p className="apl-sub">
            Takes 3 minutes. No downloads. No credit card. Just better eating.
          </p>

          {/* Onboarding preview */}
          <div className="apl-steps-preview">
            <div className="apl-steps-label">After signup, you'll set up:</div>
            <div className="apl-steps">
              {STEPS_PREVIEW.map((s, i) => (
                <div key={i} className={`apl-step ${s.done ? 'done' : ''}`}>
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust signals */}
          <div className="apl-trust">
            {['🔒 No spam, ever', '🆓 Free to start', '⚡ Instant plan'].map(t => (
              <span key={t} className="apl-trust__pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="apl-orb apl-orb--1 apl-orb--orange" />
        <div className="apl-orb apl-orb--2" />
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="auth-panel auth-panel--right">
        <div className="apr-inner">

          <Link to="/" className="apr-mobile-logo">
            <div className="logo-icon">Y</div>
            <span>YumBowl</span>
          </Link>

          <div className="apr-header">
            <h2 className="apr-title">Create account</h2>
            <p className="apr-sub">Free forever. Upgrade when ready.</p>
          </div>

          <form onSubmit={handleSubmit} className="apr-form" noValidate>

            <div className={`apr-field ${errors.name ? 'apr-field--error' : form.name ? 'apr-field--filled' : ''}`}>
              <label htmlFor="reg-name">Full name</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">👤</span>
                <input id="reg-name" type="text" placeholder="Alex Kumar"
                  value={form.name} onChange={e => set('name', e.target.value)}
                  autoComplete="name" autoFocus />
                {form.name && !errors.name && <span className="apr-check">✓</span>}
              </div>
              {errors.name && <span className="apr-err-msg">{errors.name}</span>}
            </div>

            <div className={`apr-field ${errors.email ? 'apr-field--error' : form.email ? 'apr-field--filled' : ''}`}>
              <label htmlFor="reg-email">Email address</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">✉️</span>
                <input id="reg-email" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => set('email', e.target.value)}
                  autoComplete="email" />
                {form.email && !errors.email && <span className="apr-check">✓</span>}
              </div>
              {errors.email && <span className="apr-err-msg">{errors.email}</span>}
            </div>

            <div className={`apr-field ${errors.password ? 'apr-field--error' : form.password ? 'apr-field--filled' : ''}`}>
              <label htmlFor="reg-pass">Password</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">🔒</span>
                <input id="reg-pass" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                  value={form.password} onChange={e => set('password', e.target.value)}
                  autoComplete="new-password" />
                <button type="button" className="apr-eye" onClick={() => setShowPass(v => !v)}
                  tabIndex={-1} aria-label="Toggle password visibility">
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="apr-strength">
                  <div className="apr-strength-bar">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="apr-strength-seg"
                        style={{ background: i <= strength ? strengthColor[strength] : 'var(--bg-input)' }} />
                    ))}
                  </div>
                  <span style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                </div>
              )}
              {errors.password && <span className="apr-err-msg">{errors.password}</span>}
            </div>

            <div className={`apr-field ${errors.confirm ? 'apr-field--error' : (form.confirm && form.confirm === form.password) ? 'apr-field--filled' : ''}`}>
              <label htmlFor="reg-confirm">Confirm password</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">🔑</span>
                <input id="reg-confirm" type="password" placeholder="Repeat password"
                  value={form.confirm} onChange={e => set('confirm', e.target.value)}
                  autoComplete="new-password" />
                {form.confirm && form.confirm === form.password && <span className="apr-check">✓</span>}
              </div>
              {errors.confirm && <span className="apr-err-msg">{errors.confirm}</span>}
            </div>

            <button type="submit" className={`apr-submit ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading
                ? <><span className="apr-spinner" />Creating your account…</>
                : <>Create Account <span className="apr-arrow">→</span></>}
            </button>

          </form>

          <div className="apr-divider"><span>already a member?</span></div>

          <div className="apr-register-cta">
            <Link to="/login" className="apr-register-btn">Sign in instead →</Link>
          </div>

          <div className="apr-hint">
            <span>⚡</span>
            Backend must be running on <code>localhost:5000</code>
          </div>
        </div>
      </div>
    </div>
  );
}
