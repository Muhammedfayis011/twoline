import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const manualProjects = [];

export default function CompletedWorksPage() {
  const { isAr } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    // Load Projects from Backend API
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        } else {
          // Fallback to initial if database is empty
          const saved = localStorage.getItem('twoline_completed_works');
          if (saved) {
            try { setProjectsList(JSON.parse(saved)); } catch (e) { setProjectsList(initialProjects); }
          } else {
            setProjectsList(initialProjects);
          }
        }
      })
      .catch(err => {
        console.error('API Error:', err);
        const saved = localStorage.getItem('twoline_completed_works');
        if (saved) {
          try { setProjectsList(JSON.parse(saved)); } catch (e) { setProjectsList(initialProjects); }
        } else {
          setProjectsList(initialProjects);
        }
      });
  }, []);

  const filteredItems = filter === 'all' 
    ? projectsList 
    : projectsList.filter(item => item.category === filter);

  return (
    <main id="completed-works-page" className="page-pop-enter" style={{ paddingTop: 48, paddingBottom: 96 }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <span style={{ 
            color: 'var(--accent-dark)', 
            fontWeight: 700, 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12em',
            background: 'var(--accent-bg)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--accent-light)'
          }}>
            ✨ {isAr ? 'أعمالنا' : 'Our Works'}
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 16, marginBottom: 10 }}>
            {isAr ? 'معرض الأعمال والتركيبات' : 'Works Gallery'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {isAr 
              ? 'تصفح صوراً حقيقية لمشاريع تركيب الستائر، البلايند، ورق الجدران، وتفصيل الكنب والسجاد المنجزة في الفلل والقصور السكنية في جميع أنحاء الإمارات.' 
              : 'Browse real photos of custom curtains, blinds, wallpaper, sofas, and carpet installations completed by Two Line Furniture across UAE residences.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 10, 
          flexWrap: 'wrap', 
          marginBottom: 40 
        }}>
          {['all', 'curtains', 'blinds', 'sofa', 'carpet', 'wallpaper'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                background: filter === cat ? 'var(--accent)' : 'var(--surface-2)',
                color: filter === cat ? '#FFFFFF' : 'var(--text)',
                border: '1px solid ' + (filter === cat ? 'var(--accent)' : 'var(--border-strong)'),
                padding: '8px 20px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {cat === 'all' ? (isAr ? 'الكل' : 'All') 
                : cat === 'curtains' ? (isAr ? 'ستائر شيفون وستائر' : 'Curtains')
                : cat === 'blinds' ? (isAr ? 'البلايند' : 'Blinds')
                : cat === 'sofa' ? (isAr ? 'الكنب والجلوس' : 'Sofas')
                : cat === 'carpet' ? (isAr ? 'السجاد' : 'Carpets')
                : (isAr ? 'ورق الجدران' : 'Wallpaper')}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px', 
            background: 'var(--surface-2)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)' 
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {isAr 
                ? 'لا توجد أعمال مضافة حالياً. يرجى إضافة المشاريع يدوياً في ملف الكود.' 
                : 'No projects added yet. Please add your project details manually in the code file.'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="card"
                style={{ 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  border: '1px solid var(--border)'
                }}
                onClick={() => setActiveItem(item)}
              >
                <div style={{ 
                  width: '100%', 
                  height: 240, 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={item.imageUrl || item.image} 
                    alt={isAr ? item.titleAr : item.titleEn} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <span style={{
                    position: 'absolute',
                    top: 12,
                    left: isAr ? 'auto' : 12,
                    right: isAr ? 12 : 'auto',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {isAr 
                      ? (item.category === 'curtains' ? 'ستائر' : item.category === 'blinds' ? 'بلايند' : item.category === 'sofa' ? 'كنب' : item.category === 'carpet' ? 'سجاد' : 'ورق جدران')
                      : item.category}
                  </span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    📍 {isAr ? item.locationAr : item.locationEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: 24,
          animation: 'fadeIn 0.25s ease'
        }} onClick={() => setActiveItem(null)}>
          <button 
            onClick={() => setActiveItem(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '2rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          <img 
            src={activeItem.image} 
            alt={isAr ? activeItem.titleAr : activeItem.titleEn} 
            style={{
              maxWidth: '90%',
              maxHeight: '75vh',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-2xl)',
              objectFit: 'contain',
              marginBottom: 16,
              animation: 'pagePop 0.35s ease'
            }}
          />
          <div style={{ textTransform: 'center', color: '#FFFFFF', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6 }}>
              {isAr ? activeItem.titleAr : activeItem.titleEn}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
              📍 {isAr ? activeItem.locationAr : activeItem.locationEn}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
