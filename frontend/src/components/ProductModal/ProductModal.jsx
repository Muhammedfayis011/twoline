import { useState, useEffect } from 'react';
import { ShoppingCart, Check, Star, X } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { logInquiry } from '../../utils/logInquiry';

export default function ProductModal({ product, onClose }) {
  const { t, isAr } = useLanguage();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: t[product.nameKey], price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const name = t[product.nameKey] || product.nameKey;
    const style = product.styles?.[selectedStyle] || '';
    const fabric = product.fabrics?.[selectedFabric] || '';
    const msg = `Hello Two Line Furniture,\nI am interested in: ${name}\nStyle: ${style}\nFabric: ${fabric}\nPlease provide me a quote. Thank you.`;
    logInquiry({ type: 'Product Quote', name: `Product: ${name}`, dimensions: `Style: ${style} | Fabric: ${fabric}`, details: msg });
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const colorValue = product.colors[selectedColor];
  const isWhite = colorValue === '#FFFFFF' || colorValue === '#F5F5F0';
  const isDark = ['#1A1A1A','#2C2C2C','#4A4A4A','#6B6B6B','#8B8B8B'].includes(colorValue);
  const overlayOpacity = isWhite ? 0 : isDark ? 0.5 : 0.35;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal Panel */}
      <div
        id="product-modal"
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            width: '100%',
            maxWidth: 900,
            maxHeight: '92vh',
            overflowY: 'auto',
            pointerEvents: 'all',
            animation: 'modalSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            id="modal-close-btn"
            aria-label="Close"
            style={{
              position: 'sticky',
              top: 12,
              float: 'right',
              marginRight: 12,
              zIndex: 10,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text)',
            }}
          >
            <X size={18} />
          </button>

          {/* Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            minHeight: 480,
          }} className="modal-grid">

            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)', minHeight: 340 }} className="modal-image-col">
              <img
                src={product.image}
                alt={t[product.nameKey]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: colorValue,
                mixBlendMode: 'multiply',
                opacity: overlayOpacity,
                pointerEvents: 'none',
                transition: 'all 0.3s ease',
              }} />
              {product.badge && (
                <span style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'var(--accent)', color: 'white',
                  fontSize: '0.7rem', fontWeight: 800,
                  padding: '4px 10px', borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info Panel */}
            <div style={{ padding: '32px 28px', overflowY: 'auto' }} className="modal-info-col">
              {/* Name */}
              <h2 style={{ fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, color: 'var(--text)', lineHeight: 1.2 }}>
                {t[product.nameKey]}
              </h2>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 2, color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" />)}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>4.8 (2,500+)</span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.from_price} </span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-dark)' }}>{product.price.toLocaleString()}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 4 }}>{t.aed}</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                {t[product.descKey]}
              </p>

              {/* Colors */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>
                  {isAr ? 'اللون' : 'Color'}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      aria-label={`Color ${i + 1}`}
                      style={{
                        width: 26, height: 26,
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: i === selectedColor ? '3px solid var(--accent)' : '2px solid var(--border-strong)',
                        cursor: 'pointer',
                        boxShadow: i === selectedColor ? '0 0 0 2px var(--surface), 0 0 0 4px var(--accent)' : 'none',
                        transition: 'all 0.15s ease',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Style */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>
                  {isAr ? 'الأسلوب' : 'Style'}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {product.styles.map((style, i) => (
                    <button key={i} onClick={() => setSelectedStyle(i)} style={{
                      padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${i === selectedStyle ? 'var(--accent)' : 'var(--border-strong)'}`,
                      background: i === selectedStyle ? 'var(--accent-bg)' : 'var(--surface)',
                      color: i === selectedStyle ? 'var(--accent-dark)' : 'var(--text)',
                      fontWeight: i === selectedStyle ? 700 : 400,
                      fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s ease',
                    }}>{style}</button>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>
                  {isAr ? 'القماش' : 'Fabric'}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {product.fabrics.map((fab, i) => (
                    <button key={i} onClick={() => setSelectedFabric(i)} style={{
                      padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${i === selectedFabric ? 'var(--accent)' : 'var(--border-strong)'}`,
                      background: i === selectedFabric ? 'var(--accent-bg)' : 'var(--surface)',
                      color: i === selectedFabric ? 'var(--accent-dark)' : 'var(--text)',
                      fontWeight: i === selectedFabric ? 700 : 400,
                      fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s ease',
                    }}>{fab}</button>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
                {['description','details','care'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: '8px 14px', fontSize: '0.8rem', fontWeight: activeTab === tab ? 700 : 400,
                    background: 'none', border: 'none',
                    borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                    color: activeTab === tab ? 'var(--accent-dark)' : 'var(--text-muted)',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                  }}>
                    {tab === 'description' ? (isAr ? 'الوصف' : 'Description') : tab === 'details' ? (isAr ? 'التفاصيل' : 'Details') : (isAr ? 'العناية' : 'Care')}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                {activeTab === 'description' && <p>{t[product.descKey]}</p>}
                {activeTab === 'details' && (
                  <ul style={{ paddingInlineStart: 18 }}>
                    <li>{isAr ? 'مصنوع حسب الطلب' : 'Made to measure'}</li>
                    <li>{isAr ? 'الأسلوب: ' : 'Style: '}{product.styles.join(', ')}</li>
                    <li>{isAr ? 'القماش: ' : 'Fabric: '}{product.fabrics.join(', ')}</li>
                    <li>{isAr ? 'خيار كهربائي متاح' : 'Motorization option available'}</li>
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul style={{ paddingInlineStart: 18 }}>
                    <li>{isAr ? 'تنظيف جاف أو غسيل لطيف' : 'Dry clean or gentle wash'}</li>
                    <li>{isAr ? 'تجنب الشمس المباشرة' : 'Avoid direct sunlight'}</li>
                    <li>{isAr ? 'علّق فوراً بعد الغسيل' : 'Hang immediately after washing'}</li>
                  </ul>
                )}
              </div>

              {/* Perks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 24 }}>
                {[
                  { icon: '✅', text: isAr ? 'تركيب احترافي مجاني' : 'Free professional installation' },
                  { icon: '⭐', text: isAr ? 'أقمشة فاخرة' : 'Premium luxury fabrics' },
                  { icon: '⚡', text: isAr ? 'تركيب خلال 3-5 أيام' : 'Installation in 3–5 days' },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{icon}</span> {text}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, justifyContent: 'center', minWidth: 120 }}
                  onClick={handleAddToCart}
                  id="modal-add-cart-btn"
                >
                  {added ? <><Check size={16} /> {isAr ? 'تم!' : 'Added!'}</> : <><ShoppingCart size={16} /> {isAr ? 'أضف للسلة' : 'Add to Cart'}</>}
                </button>
                <button
                  className="btn btn-whatsapp btn-lg"
                  style={{ flex: 1, justifyContent: 'center', minWidth: 120 }}
                  onClick={handleWhatsApp}
                  id="modal-whatsapp-btn"
                >
                  💬 {isAr ? 'احصل على سعر' : 'Get Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-image-col { min-height: 240px !important; border-radius: var(--radius-lg) var(--radius-lg) 0 0 !important; }
          .modal-info-col { padding: 20px 16px !important; }
        }
      `}</style>
    </>
  );
}
