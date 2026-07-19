import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, Clock, Shield, DollarSign, Wifi } from '../icons';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import ProductCard from '../components/ProductCard/ProductCard';
import Testimonials from '../components/Testimonials/Testimonials';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { logInquiry } from '../utils/logInquiry';

const featureIcons = [CheckCircle, Zap, Clock, Shield, DollarSign, Wifi];
const whyKeys = ['why_1', 'why_2', 'why_3', 'why_4', 'why_5', 'why_6'];
const steps = ['step_1', 'step_2', 'step_3', 'step_4'];

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const openWhatsApp = (source) => {
    logInquiry({ type: `WhatsApp — ${source}`, name: 'Visitor', details: `Clicked WhatsApp button: ${source}` });
    window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20your%20services.%20Please%20contact%20me.', '_blank');
  };
  const featured = products.filter(p => p.featured);

  return (
    <main id="home-page" className="page-pop-enter">
      {/* Hero */}
      <HeroSlider />

      {/* Featured Products */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">🪟 {t.nav_products}</div>
            <h2 className="section-title">{t.products_title}</h2>
            <p className="section-subtitle">{t.products_subtitle}</p>
          </div>

          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button
              className="btn btn-secondary btn-lg"
              id="view-all-products-btn"
              onClick={() => navigate('/catalog')}
            >
              {t.view_all} →
            </button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" style={{ background: 'var(--surface-2)' }} id="why-us">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">✅ Why Two Line</div>
            <h2 className="section-title">{t.why_title}</h2>
            <p className="section-subtitle">{t.why_subtitle}</p>
          </div>

          <div className="features-grid">
            {whyKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={key} className="feature-card" id={`feature-${i + 1}`}>
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="feature-title">{t[`${key}_title`]}</h3>
                  <p className="feature-desc">{t[`${key}_desc`]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-bg" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" style={{ color: 'var(--accent)', borderColor: 'rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.1)' }}>
              📋 Process
            </div>
            <h2 className="section-title" style={{ color: 'white' }}>{t.how_title}</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>{t.how_subtitle}</p>
          </div>

          <div className="steps-grid">
            {steps.map((key, i) => (
              <div key={key} className="step-card" id={`step-${i + 1}`}>
                <div className="step-number">{i + 1}</div>
                <h3 className="step-title">{t[`${key}_title`]}</h3>
                <p className="step-desc">{t[`${key}_desc`]}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button
              onClick={() => openWhatsApp('How It Works CTA')}
              className="btn btn-primary btn-lg"
              id="whatsapp-cta-btn"
            >
              💬 {t.hero_cta_primary}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Special Offers */}
      <section className="section" id="offers">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">🔥 {t.offers_title}</div>
            <h2 className="section-title">{t.offers_title}</h2>
            <p className="section-subtitle">{t.offers_subtitle}</p>
          </div>

          <div className="offers-grid">
            {[
              { key: 'offer_1', icon: '🌞' },
              { key: 'offer_2', icon: '💳' },
              { key: 'offer_3', icon: '🔧' },
            ].map(({ key, icon }) => (
              <div key={key} className="offer-card" id={key}>
                <div className="offer-icon">{icon}</div>
                <h3 className="offer-title">{t[`${key}_title`]}</h3>
                <p className="offer-desc">{t[`${key}_desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-sm" id="home-map" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 32 }}>
            <div className="section-tag">📍 {t.contact_address}</div>
            <h2 className="section-title">{t.map_title}</h2>
            <p className="section-subtitle">{t.map_sub}</p>
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', height: '400px' }}>
            <iframe 
              title="Two Line Furniture Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14529.564538805908!2d54.67389815042654!3d24.437198751509995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e408ec2284af3%3A0xb35a7a726615b8ee!2sAl%20Bahia%20-%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'var(--accent)', padding: '64px 0', textAlign: 'center' }} id="cta-banner">
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'white', marginBottom: 16, letterSpacing: '-0.02em' }}>
            {t.hero_cta_primary}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 32, fontSize: '1.05rem' }}>
            {t.hero_sub}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openWhatsApp('Bottom CTA Banner')}
              className="btn btn-whatsapp btn-lg"
              id="whatsapp-float-btn"
            >
              💬 WhatsApp Us
            </button>
            <Link to="/contact" className="btn btn-ghost btn-lg" id="contact-cta-btn">
              {t.nav_contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
