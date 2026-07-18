import { useLanguage } from '../context/LanguageContext';
import { teamMembers } from '../data/products';

export default function AboutPage() {
  const { t, isAr } = useLanguage();

  return (
    <main id="about-page" className="page-pop-enter">
      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <div className="section-tag" style={{ color: 'var(--accent)', borderColor: 'rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.1)', marginBottom: 20 }}>
            {isAr ? 'من نحن' : 'Our Story'}
          </div>
          <h1>{t.about_title}</h1>
          <p>{t.about_subtitle}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: 'var(--accent)', padding: '28px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
            {[
              { value: '10,000+', label: t.stat_clients_label },
              { value: '4.8 ⭐', label: t.stat_rating_label },
              { value: '2,500+', label: t.stat_reviews_label },
              { value: t.stat_warranty, label: t.stat_warranty_label },
            ].map(({ value, label }, i) => (
              <div key={i} style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{value}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>{t.about_story_title}</h2>
              <p>{t.about_story_1}</p>
              {t.about_story_2 && <p>{t.about_story_2}</p>}
              <p>{t.about_story_3}</p>

              <div className="about-mission-box">
                <p>{t.about_mission}</p>
              </div>
            </div>

            <div>
              {/* Why us mini cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {[
                  { icon: '🏠', title: isAr ? 'لا يوجد معرض' : 'No Showroom Needed', desc: isAr ? 'نحن نأتي إليك — في منزلك أو مكتبك.' : 'We come to you — at your home or office.' },
                  { icon: '💡', title: isAr ? 'رقمي أولاً' : 'Digital-First', desc: isAr ? 'احجز، اختر، وادفع بالكامل أونلاين.' : 'Book, customize, and pay fully online.' },
                  { icon: '🤝', title: isAr ? 'شريك UAE موثوق' : 'Trusted UAE Partner', desc: isAr ? '+10,000 عميل راضٍ في دبي وأبوظبي.' : '10,000+ satisfied customers in Dubai & Abu Dhabi.' },
                ].map(({ icon, title, desc }, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px 24px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}
                    id={`about-card-${i}`}
                  >
                    <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Areas */}
              <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: '20px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                📍 {t.about_areas}
              </div>
              <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: '16px 24px', marginTop: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {t.about_legal}
              </div>
            </div>
          </div>

          {/* Team */}
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32, textAlign: 'center' }}>
              {t.about_team_title}
            </h2>
            <div className="team-grid" style={{ justifyContent: 'center', maxWidth: 600, margin: '0 auto' }}>
              {teamMembers.map((m, i) => (
                 <div key={i} className="team-card" id={`team-card-${i}`}>
                   <div className="team-name" style={{ margin: 0, fontWeight: 700 }}>{m.name}</div>
                 </div>
              ))}
            </div>
          </div>

          {/* Office addresses */}
          <div style={{ marginTop: 64, background: 'var(--text)', borderRadius: 'var(--radius-lg)', padding: '36px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 24, color: 'white' }}>
              📍 {isAr ? 'موقعنا' : 'Our Location'}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--accent)' }}>Showroom & HQ</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  Two Line Furniture<br />
                  Al Bahia, Abu Dhabi, UAE
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--accent)' }}>{isAr ? 'منطقة الخدمة' : 'Service Coverage'}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  {isAr ? 'أبوظبي ودبي بالكامل' : 'All of Abu Dhabi & Dubai'}<br />
                  {isAr ? '(جميع المناطق مشمولة)' : '(All Districts Serviced)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
