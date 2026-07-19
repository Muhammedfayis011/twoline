import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Star, Check } from '../icons';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { logInquiry } from '../utils/logInquiry';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t, isAr } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2>{isAr ? 'المنتج غير موجود' : 'Product not found'}</h2>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate('/catalog')}>
          {isAr ? 'العودة للكتالوج' : 'Back to Catalog'}
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: t[product.nameKey],
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const name = t[product.nameKey] || product.nameKey;
    const style = product.styles?.[selectedStyle] || '';
    const fabric = product.fabrics?.[selectedFabric] || '';
    const msg = `Hello Two Line Furniture,\nI am interested in: ${name}\nStyle: ${style}\nFabric: ${fabric}\nPlease provide me a quote. Thank you.`;
    logInquiry({
      type: 'Product Quote',
      name: `Product: ${name}`,
      dimensions: `Style: ${style} | Fabric: ${fabric}`,
      details: msg,
    });
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main id="product-detail-page" className="product-detail page-pop-enter">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--accent-dark)' }}>
            {isAr ? 'الرئيسية' : 'Home'}
          </button>
          <span>/</span>
          <button onClick={() => navigate('/catalog')} style={{ cursor: 'pointer', color: 'var(--accent-dark)' }}>
            {isAr ? 'المنتجات' : 'Products'}
          </button>
          <span>/</span>
          <span>{t[product.nameKey]}</span>
        </div>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div
              className="gallery-main"
              onClick={() => setLightbox(true)}
              title={isAr ? 'انقر لعرض الصورة كاملة' : 'Click to view full image'}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}
            >
              <img src={product.image} alt={t[product.nameKey]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
              {/* Color overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: product.colors[selectedColor],
                mixBlendMode: 'multiply',
                opacity: (product.colors[selectedColor] === '#FFFFFF' || product.colors[selectedColor] === '#F5F5F0')
                  ? 0
                  : (product.colors[selectedColor] === '#1A1A1A' || product.colors[selectedColor] === '#2C2C2C' || product.colors[selectedColor] === '#4A4A4A' || product.colors[selectedColor] === '#6B6B6B' || product.colors[selectedColor] === '#8B8B8B')
                  ? 0.5 : 0.35,
                pointerEvents: 'none',
                transition: 'background-color 0.3s ease, opacity 0.3s ease',
              }} />
              {/* Zoom hint icon */}
              <div style={{
                position: 'absolute', bottom: 12, right: 12,
                background: 'rgba(0,0,0,0.55)', borderRadius: '50%',
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '1rem', backdropFilter: 'blur(4px)',
                pointerEvents: 'none',
              }}>🔍</div>
            </div>
            {product.badge && (
              <div style={{ marginTop: 12 }}>
                <span className="badge badge-accent">{product.badge}</span>
              </div>
            )}
          </div>

          {/* ── Full-Screen Lightbox ── */}
          {lightbox && (
            <div
              onClick={() => setLightbox(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                background: 'rgba(0,0,0,0.96)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'zoom-out',
                animation: 'lbFadeIn 0.22s ease',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setLightbox(false)}
                style={{
                  position: 'fixed', top: 18, right: 20, zIndex: 100000,
                  background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%', width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '1.3rem', cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s ease',
                }}
                aria-label="Close"
              >✕</button>

              {/* Full image */}
              <img
                src={product.image}
                alt={t[product.nameKey]}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '95vw',
                  maxHeight: '95vh',
                  objectFit: 'contain',
                  borderRadius: 8,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
                  animation: 'lbZoomIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
                  cursor: 'default',
                }}
              />

              {/* Product name label at bottom */}
              <div style={{
                position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', fontWeight: 600,
                background: 'rgba(0,0,0,0.5)', padding: '8px 20px',
                borderRadius: 40, backdropFilter: 'blur(8px)',
                pointerEvents: 'none', whiteSpace: 'nowrap',
              }}>
                {t[product.nameKey]} &nbsp;·&nbsp; {isAr ? 'اضغط للإغلاق' : 'Click anywhere to close'}
              </div>

              <style>{`
                @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
                @keyframes lbZoomIn {
                  from { opacity:0; transform: scale(0.82); }
                  to   { opacity:1; transform: scale(1); }
                }
                .gallery-main:hover img { transform: scale(1.03); }
              `}</style>
            </div>
          )}

          {/* Info */}
          <div>
            <h1 className="product-info-name">{t[product.nameKey]}</h1>

            <div className="product-info-price">
              <span className="price-from">{t.from_price}</span>
              <span className="price-amount">{product.price.toLocaleString()}</span>
              <span className="price-currency">{t.aed}</span>
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 3, color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" />)}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>4.8 (2,500+ {isAr ? 'تقييم' : 'reviews'})</span>
            </div>

            <p className="product-desc-text">{t[product.descKey]}</p>

            {/* Color picker */}
            <div style={{ marginBottom: 24 }}>
              <div className="product-options-label">{isAr ? 'اللون' : 'Color'}</div>
              <div className="swatch-row" style={{ gap: 10 }}>
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`swatch ${i === selectedColor ? 'active' : ''}`}
                    style={{ backgroundColor: color, width: 28, height: 28 }}
                    onClick={() => setSelectedColor(i)}
                    id={`detail-swatch-${i}`}
                    aria-label={`Color ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Style */}
            <div style={{ marginBottom: 24 }}>
              <div className="product-options-label">{isAr ? 'الأسلوب' : 'Style'}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.styles.map((style, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedStyle(i)}
                    id={`style-btn-${i}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${i === selectedStyle ? 'var(--accent)' : 'var(--border-strong)'}`,
                      background: i === selectedStyle ? 'var(--accent-bg)' : 'var(--surface)',
                      color: i === selectedStyle ? 'var(--accent-dark)' : 'var(--text)',
                      fontWeight: i === selectedStyle ? 700 : 400,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div style={{ marginBottom: 32 }}>
              <div className="product-options-label">{isAr ? 'القماش' : 'Fabric'}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.fabrics.map((fab, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedFabric(i)}
                    id={`fabric-btn-${i}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${i === selectedFabric ? 'var(--accent)' : 'var(--border-strong)'}`,
                      background: i === selectedFabric ? 'var(--accent-bg)' : 'var(--surface)',
                      color: i === selectedFabric ? 'var(--accent-dark)' : 'var(--text)',
                      fontWeight: i === selectedFabric ? 700 : 400,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={handleAddToCart}
                id="product-add-cart-btn"
              >
                {added ? (
                  <><Check size={18} /> {isAr ? 'تم الإضافة!' : 'Added!'}</>
                ) : (
                  <><ShoppingCart size={18} /> {isAr ? 'أضف للسلة' : 'Add to Cart'}</>
                )}
              </button>
              <button
                onClick={handleWhatsApp}
                className="btn btn-whatsapp btn-lg"
                id="product-whatsapp-btn"
              >
                💬 {isAr ? 'احصل على سعر' : 'Get Quote'}
              </button>
            </div>

            {/* Perks */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '✅', text: isAr ? 'تركيب احترافي مجاني' : 'Free professional installation' },
                { icon: '⭐', text: isAr ? 'أقمشة فاخرة متميزة' : 'Premium luxury fabrics' },
                { icon: '⚡', text: isAr ? 'تركيب خلال 3-5 أيام' : 'Installation in 3–5 days' },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>

            {/* Price Transparency Card */}
            {product.category === 'sofa' && (
              <div style={{
                marginTop: 24,
                padding: 20,
                background: 'var(--accent-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--accent-light)',
                fontSize: '0.9rem'
              }}>
                <h4 style={{ color: 'var(--accent-dark)', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  📊 {isAr ? 'مقارنة الأسعار في الإمارات' : 'UAE Price Transparency'}
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
                  {isAr 
                    ? 'بفضل بيعنا المباشر من ورشتنا، نقدم أسعاراً أقل بنسبة تزيد عن 35٪ عن متوسط السوق الإماراتي بدون التضحية بالجودة.' 
                    : 'Due to our direct-from-workshop model, we deliver luxury custom sofas at over 35% lower than the UAE retail average without premium markups.'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'center' }}>
                  <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {isAr ? 'متوسط السعر في الإمارات' : 'UAE Average Price'}
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'line-through', marginTop: 4 }}>
                      {Math.round(product.price * 1.55).toLocaleString()} AED
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-light)', boxShadow: 'var(--shadow-sm)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {isAr ? 'سعر تو لاين' : 'Two Line Price'}
                    </span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-dark)', marginTop: 4 }}>
                      {product.price.toLocaleString()} AED
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="product-tabs">
              {['description', 'details', 'care'].map(tab => (
                <button
                  key={tab}
                  className={`product-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  id={`tab-${tab}`}
                >
                  {tab === 'description' ? (isAr ? 'الوصف' : 'Description')
                    : tab === 'details' ? (isAr ? 'التفاصيل' : 'Details')
                    : (isAr ? 'العناية' : 'Care')}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {activeTab === 'description' && <p>{t[product.descKey]}</p>}
              {activeTab === 'details' && (
                <ul style={{ paddingInlineStart: 20 }}>
                  <li>{isAr ? 'مصنوع حسب الطلب لمقاسات نافذتك' : 'Made to measure for your exact window dimensions'}</li>
                  <li>{isAr ? 'أسلوب الترويسة: ' : 'Header style: '}{product.styles.join(', ')}</li>
                  <li>{isAr ? 'القماش: ' : 'Fabric: '}{product.fabrics.join(', ')}</li>
                  <li>{isAr ? 'خيار التحريك الكهربائي متاح' : 'Motorization option available (Somfy, Alexa compatible)'}</li>
                </ul>
              )}
              {activeTab === 'care' && (
                <ul style={{ paddingInlineStart: 20 }}>
                  <li>{isAr ? 'يُنصح بالتنظيف الجاف أو الغسيل اللطيف' : 'Dry clean or gentle machine wash recommended'}</li>
                  <li>{isAr ? 'تجنب التعرض المباشر لأشعة الشمس لفترات طويلة' : 'Avoid prolonged direct sun exposure'}</li>
                  <li>{isAr ? 'لا تعصر — علّق فورًا بعد الغسيل' : "Don't wring — hang immediately after washing"}</li>
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
