import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';

const reviews = [
  { id: 1, nameKey: 'review_1_name', locationKey: 'review_1_location', textKey: 'review_1_text' },
  { id: 2, nameKey: 'review_2_name', locationKey: 'review_2_location', textKey: 'review_2_text' },
  { id: 3, nameKey: 'review_3_name', locationKey: 'review_3_location', textKey: 'review_3_text' },
  { id: 4, nameKey: 'review_4_name', locationKey: 'review_4_location', textKey: 'review_4_text' },
];

export default function Testimonials() {
  const { t, isAr } = useLanguage();
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(reviews.length - 1, c + 1));

  useEffect(() => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.testimonial-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      trackRef.current.style.transform = `translateX(${isAr ? '' : '-'}${current * cardWidth}px)`;
    }
  }, [current, isAr]);

  return (
    <section className="section testimonials-bg" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">⭐ Reviews</div>
          <h2 className="section-title">{t.testimonials_title}</h2>
          {t.testimonials_subtitle && <p className="section-subtitle">{t.testimonials_subtitle}</p>}
        </div>

        <div className="testimonials-carousel">
          <div className="testimonials-track" ref={trackRef}>
            {reviews.map(r => {
              const initials = t[r.nameKey].split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div key={r.id} className="testimonial-card" id={`testimonial-${r.id}`}>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" />)}
                  </div>
                  <p className="testimonial-text">{t[r.textKey]}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{initials}</div>
                    <div>
                      <div className="author-name">{t[r.nameKey]}</div>
                      <div className="author-location">
                        <MapPin size={11} /> {t[r.locationKey]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={isAr ? next : prev}
            disabled={current === 0}
            id="testimonials-prev"
            style={{ opacity: current === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="carousel-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                id={`carousel-dot-${i}`}
              />
            ))}
          </div>

          <button
            className="carousel-btn"
            onClick={isAr ? prev : next}
            disabled={current === reviews.length - 1}
            id="testimonials-next"
            style={{ opacity: current === reviews.length - 1 ? 0.4 : 1 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
