import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { heroSlides } from '../../data/products';

export default function HeroSlider() {
  const { t, isAr } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const navigate = useNavigate();

  const goTo = useCallback((index) => {
    setCurrent(index);
    setAnimKey(k => k + 1);
  }, []);

  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="hero" id="hero-slider">
      {heroSlides.map((s, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <img src={s.image} alt={isAr ? s.badge_ar : s.badge_en} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="container">
          <div className="hero-text" key={animKey}>
            <div className="hero-badge">
              ✦ {isAr ? slide.badge_ar : slide.badge_en}
            </div>
            <h1 className="hero-headline">
              {(isAr ? slide.headline_ar : slide.headline_en).map((line, i) => (
                <div key={i}>{i === 1 ? <span className="accent">{line}</span> : line}</div>
              ))}
            </h1>
            <p className="hero-sub">
              {isAr ? slide.sub_ar : slide.sub_en}
            </p>
            <div className="hero-actions">
              <button
                id="hero-book-btn"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/contact')}
              >
                {t.hero_cta_primary}
              </button>
              <button
                id="hero-estimate-btn"
                className="btn btn-ghost btn-lg"
                onClick={() => navigate('/catalog')}
              >
                {t.hero_cta_secondary}
              </button>
            </div>

            {current === 0 && (
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">{t.stat_clients}</div>
                  <div className="hero-stat-label">{t.stat_clients_label}</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">{t.stat_rating}</div>
                  <div className="hero-stat-label">{t.stat_rating_label}</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">{t.stat_reviews}</div>
                  <div className="hero-stat-label">{t.stat_reviews_label}</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">{t.stat_warranty}</div>
                  <div className="hero-stat-label">{t.stat_warranty_label}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <div className="hero-arrows">
        <button className="hero-arrow" id="hero-prev" onClick={prev} aria-label="Previous slide">
          {isAr ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
        <button className="hero-arrow" id="hero-next" onClick={next} aria-label="Next slide">
          {isAr ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            id={`hero-dot-${i}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
