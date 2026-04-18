import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import './AuthPages.css';

/* Floating food items for the left panel */
const FLOATERS = [
  { emoji: '🥗', x: 12,  y: 15,  size: 2.8, delay: 0,    dur: 7 },
  { emoji: '🍛', x: 75,  y: 8,   size: 2.2, delay: 1.2,  dur: 9 },
  { emoji: '🥑', x: 88,  y: 40,  size: 1.8, delay: 0.5,  dur: 6 },
  { emoji: '🍗', x: 20,  y: 72,  size: 2.5, delay: 2,    dur: 8 },
  { emoji: '🫐', x: 55,  y: 80,  size: 1.6, delay: 0.8,  dur: 7.5 },
  { emoji: '🥦', x: 82,  y: 70,  size: 2,   delay: 1.5,  dur: 6.5 },
  { emoji: '🍚', x: 40,  y: 20,  size: 1.9, delay: 3,    dur: 8.5 },
  { emoji: '🥚', x: 10,  y: 50,  size: 1.5, delay: 2.5,  dur: 7 },
  { emoji: '🧆', x: 65,  y: 55,  size: 2.1, delay: 1,    dur: 9 },
  { emoji: '🌿', x: 30,  y: 88,  size: 1.7, delay: 0.3,  dur: 6 },
  { emoji: '🫙', x: 92,  y: 18,  size: 1.4, delay: 1.8,  dur: 8 },
  { emoji: '🥜', x: 48,  y: 46,  size: 1.3, delay: 2.2,  dur: 7.5 },
];

const STATS = [
  { icon: '🏆', val: '2,400+', label: 'Plans generated' },
  { icon: '🌿', val: '50+',    label: 'Indian meals' },
  { icon: '💰', val: '₹ Smart', label: 'Budget aware' },
];

const TESTIMONIAL = {
  quote: '"Lost 8 kg in 3 months eating food I actually love."',
  name: 'Priya M.',
  role: 'Weight loss goal · Mumbai',
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password)     errs.password = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email.trim().toLowerCase(), form.password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Check credentials.';
      toast.error(msg);
      setErrors({ password: msg });
    } finally { setLoading(false); }
  };

  return (
    <div className={`auth-split ${mounted ? 'auth-split--in' : ''}`}>

      {/* ══ LEFT PANEL — Visual / Brand ══ */}
      <div className="auth-panel auth-panel--left" aria-hidden="true">
        {/* Gradient mesh background */}
        <div className="apl-mesh" />
        <div className="apl-grid" />

        {/* Floating food emojis */}
        <div className="apl-floaters">
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="apl-floater"
              style={{
                left: `${f.x}%`, top: `${f.y}%`,
                fontSize: `${f.size}rem`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.dur}s`,
              }}
            >{f.emoji}</span>
          ))}
        </div>

        {/* Center content */}
        <div className="apl-center">
          {/* Logo */}
          <div className="apl-logo">
            <div className="apl-logo__icon">Y</div>
            <span className="apl-logo__text">YumBowl</span>
          </div>

          {/* Big headline */}
          <h1 className="apl-headline">
            Eat smarter.<br />
            <span className="apl-headline__grad">Live stronger.</span>
          </h1>
          <p className="apl-sub">
            Personalized Indian meal plans built around your body, goals and budget.
          </p>

          {/* Stats row */}
          <div className="apl-stats">
            {STATS.map(s => (
              <div key={s.label} className="apl-stat">
                <span className="apl-stat__icon">{s.icon}</span>
                <span className="apl-stat__val">{s.val}</span>
                <span className="apl-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <figure className="apl-testimonial">
            <blockquote>{TESTIMONIAL.quote}</blockquote>
            <figcaption>
              <div className="apl-testi-avatar">PM</div>
              <div>
                <strong>{TESTIMONIAL.name}</strong>
                <span>{TESTIMONIAL.role}</span>
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Bottom glow orb */}
        <div className="apl-orb apl-orb--1" />
        <div className="apl-orb apl-orb--2" />
      </div>

      {/* ══ RIGHT PANEL — Form ══ */}
      <div className="auth-panel auth-panel--right">
        <div className="apr-inner">

          {/* Mobile logo */}
          <Link to="/" className="apr-mobile-logo">
            <div className="logo-icon">Y</div>
            <span>YumBowl</span>
          </Link>

          <div className="apr-header">
            <h2 className="apr-title">Sign in</h2>
            <p className="apr-sub">Welcome back. Your plan is waiting.</p>
          </div>

          {/* Social-proof micro badge */}
          <div className="apr-badge">
            <span className="apr-badge__avatars">
              {['PM','RS','AK'].map(a => <span key={a} className="apr-badge__av">{a}</span>)}
            </span>
            <span>Join 2,400+ people on their nutrition journey</span>
          </div>

          <form onSubmit={handleSubmit} className="apr-form" noValidate>

            {/* Email */}
            <div className={`apr-field ${errors.email ? 'apr-field--error' : form.email ? 'apr-field--filled' : ''}`}>
              <label htmlFor="login-email">Email address</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">✉️</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                {form.email && !errors.email && <span className="apr-check">✓</span>}
              </div>
              {errors.email && <span className="apr-err-msg">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`apr-field ${errors.password ? 'apr-field--error' : form.password ? 'apr-field--filled' : ''}`}>
              <label htmlFor="login-pass">Password</label>
              <div className="apr-input-wrap">
                <span className="apr-input-icon">🔒</span>
                <input
                  id="login-pass"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="apr-eye"
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="apr-err-msg">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`apr-submit ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <><span className="apr-spinner" />Signing you in…</>
              ) : (
                <>Sign In <span className="apr-arrow">→</span></>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="apr-divider"><span>or</span></div>

          {/* Register CTA */}
          <div className="apr-register-cta">
            <p>Don't have an account?</p>
            <Link to="/register" className="apr-register-btn">
              Create your free plan →
            </Link>
          </div>

          {/* Backend hint */}
          <div className="apr-hint">
            <span>⚡</span>
            Backend must be running on <code>localhost:5000</code>
          </div>

        </div>
      </div>
    </div>
  );
}
