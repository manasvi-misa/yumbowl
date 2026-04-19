import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

/* ─── tiny hook: viewport entry ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── animated counter ─── */
function Counter({ to, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── data ─── */
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
];

const FEATURES = [
  {
    icon: '🧬',
    color: 'accent',
    title: 'Science-backed macros',
    desc: 'We compute your BMR and TDEE using the Mifflin-St Jeor equation, then dial in protein, carbs and fat to your exact goal.'
  },
  {
    icon: '🥘',
    color: 'orange',
    title: 'Real Indian food',
    desc: 'Dal chawal. Poha. Paneer tikka. Grilled chicken. 50+ dishes built into the plan — food you\'ll actually want to eat.'
  },
  {
    icon: '💸',
    color: 'blue',
    title: 'Budget-first planning',
    desc: 'Enter your monthly spend. We\'ll stretch every rupee across a nutritious week without blowing the budget.'
  },
  {
    icon: '🚫',
    color: 'red',
    title: 'Allergy filtering',
    desc: 'Peanuts, dairy, gluten, eggs — select what to avoid and it\'s scrubbed from every single meal.'
  },
  {
    icon: '🛒',
    color: 'purple',
    title: 'Auto shopping list',
    desc: 'A categorised, costed grocery list generated the moment your plan is ready. Paste it straight into BigBasket.'
  },
  {
    icon: '📊',
    color: 'green',
    title: 'Progress tracking',
    desc: 'Log weight, waist, food diary and water. Visualise your transformation on clean charts — week by week.'
  },
];

const HOW_STEPS = [
  { num: '01', title: 'Tell us about you', desc: 'Age, height, weight, diet type, allergies, goal and monthly budget — takes about 3 minutes.' },
  { num: '02', title: 'We compute your plan', desc: 'Our engine calculates TDEE, sets macros and picks the best matching Indian meals for every slot.' },
  { num: '03', title: 'Get your 7-day plan', desc: 'Full week of breakfast, lunch, snacks and dinner — with recipes, prep times and cost per meal.' },
  { num: '04', title: 'Track and improve', desc: 'Log food, water and body stats daily. Regenerate the plan any time as your goals evolve.' },
];

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    highlight: false,
    features: ['1 meal plan', 'Food diary', 'Water tracker', 'Progress log', '—', '—'],
  },
  {
    name: 'Pro',
    price: '₹299',
    period: 'per month',
    highlight: true,
    badge: 'Most popular',
    features: ['Unlimited meal plans', 'Food diary', 'Water tracker', 'Progress + charts', 'Shopping list', 'Priority support'],
  },
  {
    name: 'Annual',
    price: '₹1,999',
    period: 'per year  ·  save 44%',
    highlight: false,
    features: ['Everything in Pro', 'Food diary', 'Water tracker', 'Progress + charts', 'Shopping list', 'Priority support'],
  },
];

const TESTIMONIALS = [
  { name: 'Priya M.', role: 'Lost 8 kg in 3 months', avatar: 'PM', quote: 'Finally a plan that uses food I already cook at home. The budget feature is a lifesaver for my household.' },
  { name: 'Rohan S.', role: 'Gained 4 kg lean muscle', avatar: 'RS', quote: 'The macro targets are spot-on. I\'ve tried 4 other apps and none of them had proper Indian meal options.' },
  { name: 'Ananya K.', role: 'Maintained goal weight', avatar: 'AK', quote: 'Love how it updates my shopping list automatically. Zero guesswork at the grocery store on weekends.' },
];

/* ─── component ─── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroRef, heroIn] = useInView(0.1);
  const [featRef, featIn] = useInView(0.1);
  const [howRef, howIn]   = useInView(0.1);
  const [priceRef, priceIn] = useInView(0.1);
  const [testRef, testIn]   = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="lp" lang="en">

      {/* ── SEO meta injected via Helmet alternative: plain title tag handled in index.html ── */}

      {/* ════════ NAV ════════ */}
      <header className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`} role="banner">
        <nav className="lp-nav__inner" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="lp-logo" aria-label="YumBowl home">
            <span className="lp-logo__icon" aria-hidden="true">Y</span>
            <span className="lp-logo__text">YumBowl</span>
          </Link>

          {/* Desktop links */}
          <ul className="lp-nav__links" role="list">
            {NAV_LINKS.map(l => (
              <li key={l.label}><a href={l.href} className="lp-nav__link">{l.label}</a></li>
            ))}
          </ul>

          {/* CTA */}
          <div className="lp-nav__cta">
            <Link to="/login" className="btn btn-ghost lp-nav__signin">Sign in</Link>
            <Link to="/register" className="btn btn-primary lp-nav__getstarted">Get started</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`lp-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`lp-mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="lp-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <Link to="/login"    className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link to="/register" className="btn btn-primary"   onClick={() => setMenuOpen(false)}>Get started</Link>
        </div>
      </header>

      {/* ════════ HERO ════════ */}
      <main>
        <section
          className={`lp-hero ${heroIn ? 'in-view' : ''}`}
          ref={heroRef}
          aria-labelledby="hero-heading"
        >
          {/* Background orbs */}
          <div className="lp-orb lp-orb--1" aria-hidden="true" />
          <div className="lp-orb lp-orb--2" aria-hidden="true" />
          <div className="lp-orb lp-orb--3" aria-hidden="true" />
          <div className="lp-grid-overlay" aria-hidden="true" />

          <div className="lp-hero__inner">
            <div className="lp-hero__badge">
              <span className="badge badge-accent">🌿 Indian-first nutrition planning</span>
            </div>

            <h1 id="hero-heading" className="lp-hero__h1">
              Your body.<br />
              Your food.<br />
              <em className="lp-hero__gradient">Your plan.</em>
            </h1>

            <p className="lp-hero__sub">
              YumBowl builds a personalised 7-day Indian meal plan around your BMI, goals, allergies and monthly budget — in under 60 seconds.
            </p>

            <div className="lp-hero__actions">
              <Link to="/register" className="btn btn-primary lp-btn-xl">
                Build my plan — it's free →
              </Link>
              <a href="#how" className="btn btn-secondary lp-btn-xl">See how it works</a>
            </div>

            {/* Social proof strip */}
            <div className="lp-hero__proof">
              <div className="lp-avatars" aria-hidden="true">
                {['PM','RS','AK','VN','DK'].map(i => <div key={i} className="lp-avatar">{i}</div>)}
              </div>
              <span><strong>2,400+</strong> plans generated this month</span>
            </div>
          </div>

          {/* Floating dashboard card */}
          <div className="lp-hero__card-wrap" aria-hidden="true">
            <div className="lp-dash-card">
              <div className="lp-dash-card__topbar">
                <div className="lp-dash-card__dot red" />
                <div className="lp-dash-card__dot yellow" />
                <div className="lp-dash-card__dot green" />
                <span className="lp-dash-card__url">yumbowl.app/dashboard</span>
              </div>
              <div className="lp-dash-card__body">
                <div className="lp-dash-card__greeting">Good morning, Priya 👋</div>
                <div className="lp-dash-card__metrics">
                  <div className="lp-metric accent"><div className="lp-metric__val">1,850</div><div className="lp-metric__label">Cal left</div></div>
                  <div className="lp-metric orange"><div className="lp-metric__val">82g</div><div className="lp-metric__label">Protein</div></div>
                  <div className="lp-metric blue"><div className="lp-metric__val">1.8L</div><div className="lp-metric__label">Water</div></div>
                  <div className="lp-metric purple"><div className="lp-metric__val">67.2</div><div className="lp-metric__label">kg</div></div>
                </div>
                <div className="lp-dash-card__meals">
                  {[
                    { time:'7:30', label:'Breakfast', dish:'Oats Porridge + Banana', kcal:'350 kcal' },
                    { time:'12:30', label:'Lunch', dish:'Dal Rice + Palak Sabzi', kcal:'550 kcal' },
                    { time:'7:30', label:'Dinner', dish:'Grilled Chicken + Veg', kcal:'480 kcal' },
                  ].map(m => (
                    <div key={m.time} className="lp-meal-row">
                      <div className="lp-meal-time">{m.time}</div>
                      <div className="lp-meal-info">
                        <span className="lp-meal-tag">{m.label}</span>
                        <span className="lp-meal-dish">{m.dish}</span>
                      </div>
                      <span className="lp-meal-kcal">{m.kcal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="lp-chip lp-chip--1"> -500 kcal deficit</div>
            <div className="lp-chip lp-chip--2"> Goal: 65 kg</div>
            <div className="lp-chip lp-chip--3">₹180 / day budget</div>
          </div>
        </section>

        {/* ════════ STATS BAR ════════ */}
        <section className="lp-stats" aria-label="Platform statistics">
          <div className="lp-stats__inner">
            {[
              { num: 50,   suf: '+',  label: 'Indian meal options' },
              { num: 2400, suf: '+',  label: 'Plans generated' },
              { num: 100,  suf: '%',  label: 'Personalized' },
              { num: 7,    suf: '-day', label: 'Weekly plan' },
            ].map(s => (
              <div key={s.label} className="lp-stat">
                <div className="lp-stat__num">
                  <Counter to={s.num} suffix={s.suf} />
                </div>
                <div className="lp-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ FEATURES ════════ */}
        <section
          id="features"
          className={`lp-features ${featIn ? 'in-view' : ''}`}
          ref={featRef}
          aria-labelledby="features-heading"
        >
          <div className="lp-section-label" aria-hidden="true">What you get</div>
          <h2 id="features-heading" className="lp-section-h2">
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="lp-section-sub">
            Built around Indian food culture, sensible budgets, and real nutrition science.
          </p>

          <div className="lp-features__grid" role="list">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className={`lp-feat-card lp-feat-card--${f.color}`}
                style={{ '--delay': `${i * 80}ms` }}
                role="listitem"
              >
                <div className="lp-feat-card__icon" aria-hidden="true">{f.icon}</div>
                <h3 className="lp-feat-card__title">{f.title}</h3>
                <p className="lp-feat-card__desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ════════ HOW IT WORKS ════════ */}
        <section
          id="how"
          className={`lp-how ${howIn ? 'in-view' : ''}`}
          ref={howRef}
          aria-labelledby="how-heading"
        >
          <div className="lp-how__inner">
            <div className="lp-how__left">
              <div className="lp-section-label" aria-hidden="true">Process</div>
              <h2 id="how-heading" className="lp-section-h2" style={{ textAlign:'left' }}>
                From sign-up to<br />meal plan in 3 min.
              </h2>
              <p className="lp-section-sub" style={{ textAlign:'left' }}>
                No nutritionist appointment. No spreadsheet. Just answers to a few questions.
              </p>
            </div>

            <ol className="lp-how__steps" aria-label="How it works steps">
              {HOW_STEPS.map((s, i) => (
                <li key={s.num} className="lp-step" style={{ '--delay': `${i * 100}ms` }}>
                  <div className="lp-step__num" aria-hidden="true">{s.num}</div>
                  <div className="lp-step__body">
                    <h3 className="lp-step__title">{s.title}</h3>
                    <p className="lp-step__desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ════════ TESTIMONIALS ════════ */}
        <section
          className={`lp-test ${testIn ? 'in-view' : ''}`}
          ref={testRef}
          aria-labelledby="testimonials-heading"
        >
          <div className="lp-section-label" aria-hidden="true">Real results</div>
          <h2 id="testimonials-heading" className="lp-section-h2">What our users say</h2>

          <div className="lp-test__grid" role="list">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className="lp-test-card"
                style={{ '--delay': `${i * 100}ms` }}
                role="listitem"
              >
                <blockquote className="lp-test-card__quote">"{t.quote}"</blockquote>
                <figcaption className="lp-test-card__author">
                  <div className="lp-test-card__avatar" aria-hidden="true">{t.avatar}</div>
                  <div>
                    <div className="lp-test-card__name">{t.name}</div>
                    <div className="lp-test-card__role">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ════════ PRICING ════════ */}
        <section
          id="pricing"
          className={`lp-pricing ${priceIn ? 'in-view' : ''}`}
          ref={priceRef}
          aria-labelledby="pricing-heading"
        >
          <div className="lp-section-label" aria-hidden="true">Pricing</div>
          <h2 id="pricing-heading" className="lp-section-h2">Simple, honest pricing</h2>
          <p className="lp-section-sub">Start free. Upgrade when you're ready.</p>

          <div className="lp-pricing__grid" role="list">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`lp-plan ${plan.highlight ? 'lp-plan--highlight' : ''}`}
                style={{ '--delay': `${i * 80}ms` }}
                role="listitem"
              >
                {plan.badge && <div className="lp-plan__badge">{plan.badge}</div>}
                <div className="lp-plan__name">{plan.name}</div>
                <div className="lp-plan__price">
                  <span className="lp-plan__amount">{plan.price}</span>
                  <span className="lp-plan__period">{plan.period}</span>
                </div>
                <ul className="lp-plan__features" aria-label={`${plan.name} plan features`}>
                  {plan.features.map((f, j) => (
                    <li key={j} className={`lp-plan__feat ${f === '—' ? 'lp-plan__feat--na' : ''}`}>
                      <span aria-hidden="true">{f === '—' ? '—' : '✓'}</span>
                      <span>{f === '—' ? 'Not included' : f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} lp-plan__cta`}
                >
                  {plan.name === 'Free' ? 'Start free' : 'Choose plan'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ FINAL CTA ════════ */}
        <section className="lp-cta" aria-labelledby="cta-heading">
          <div className="lp-cta__inner">
            <div className="lp-cta__orb" aria-hidden="true" />
            <h2 id="cta-heading" className="lp-cta__h2">
              Ready to eat better,<br />spend less, feel more?
            </h2>
            <p className="lp-cta__sub">No downloads. No subscriptions to start. Takes 3 minutes.</p>
            <Link to="/register" className="btn btn-primary lp-btn-xl lp-cta__btn">
              Build my free plan →
            </Link>
          </div>
        </section>
      </main>

      {/* ════════ FOOTER ════════ */}
      <footer className="lp-footer" role="contentinfo">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <Link to="/" className="lp-logo" aria-label="YumBowl home">
              <span className="lp-logo__icon" aria-hidden="true">Y</span>
              <span className="lp-logo__text">YumBowl</span>
            </Link>
            <p>Personalized Indian diet plans built on nutrition science.</p>
          </div>
          <nav className="lp-footer__links" aria-label="Footer navigation">
            <div className="lp-footer__col">
              <h3>Product</h3>
              <a href="#features">Features</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="lp-footer__col">
              <h3>Account</h3>
              <Link to="/register">Sign up</Link>
              <Link to="/login">Sign in</Link>
            </div>
            <div className="lp-footer__col">
              <h3>Tech stack</h3>
              <span>React 18</span>
              <span>Node / Express</span>
              <span>MongoDB</span>
            </div>
          </nav>
        </div>
        <div className="lp-footer__bottom">
          <span>© 2024 YumBowl. All rights reserved.</span>
          <span>Built with love for healthy audiences</span>
        </div>
      </footer>
    </div>
  );
}
