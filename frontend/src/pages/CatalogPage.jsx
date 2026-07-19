import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from '../icons';
import ProductCard from '../components/ProductCard/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

const categories = ['all', 'curtains', 'blinds', 'motorized', 'sofa', 'carpet', 'wallpaper'];

export default function CatalogPage() {
  const { t, isAr } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('cat') || 'all';

  const [cat, setCat] = useState(initCat);
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(6000);

  // Sync state if URL query params change (e.g. from navbar clicks)
  useEffect(() => {
    setCat(searchParams.get('cat') || 'all');
  }, [searchParams]);

  // Custom Sofa Modal States
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');

  const saveInquiry = (type, name, phone, dimensions, details) => {
    const saved = localStorage.getItem('twoline_inquiries');
    let list = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {
        list = [];
      }
    }
    const newInquiry = {
      id: Date.now(),
      type,
      name,
      phone,
      dimensions: dimensions || null,
      details: details || '',
      date: new Date().toLocaleString()
    };
    list.unshift(newInquiry);
    localStorage.setItem('twoline_inquiries', JSON.stringify(list));
  };

  const handleSofaSubmit = (e) => {
    e.preventDefault();
    saveInquiry('sofa', clientName, clientPhone, null, clientMessage);
    const msg = `Hello Two Line!\n\nI am interested in a Custom-made Sofa.\n- Name: ${clientName}\n- Contact: ${clientPhone}\n- Request details: ${clientMessage}`;
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
    setShowModal(false);
    setClientName('');
    setClientPhone('');
    setClientMessage('');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  // Custom Carpet Modal States
  const [showCarpetModal, setShowCarpetModal] = useState(false);
  const [carpetWidth, setCarpetWidth] = useState('');
  const [carpetLength, setCarpetLength] = useState('');
  const [carpetClientName, setCarpetClientName] = useState('');
  const [carpetClientPhone, setCarpetClientPhone] = useState('');
  const [carpetClientMessage, setCarpetClientMessage] = useState('');

  const handleCarpetSubmit = (e) => {
    e.preventDefault();
    saveInquiry('carpet', carpetClientName, carpetClientPhone, `${carpetWidth}m x ${carpetLength}m`, carpetClientMessage);
    const msg = `Hello Two Line!\n\nI am interested in a Custom-made Carpet / Rug.\n- Name: ${carpetClientName}\n- Contact: ${carpetClientPhone}\n- Dimensions: ${carpetWidth}m x ${carpetLength}m\n- Special request: ${carpetClientMessage}`;
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
    setShowCarpetModal(false);
    setCarpetClientName('');
    setCarpetClientPhone('');
    setCarpetWidth('');
    setCarpetLength('');
    setCarpetClientMessage('');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  // Custom Wallpaper Modal States
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);
  const [wallpaperWidth, setWallpaperWidth] = useState('');
  const [wallpaperHeight, setWallpaperHeight] = useState('');
  const [wallpaperClientName, setWallpaperClientName] = useState('');
  const [wallpaperClientPhone, setWallpaperClientPhone] = useState('');
  const [wallpaperClientMessage, setWallpaperClientMessage] = useState('');

  const handleWallpaperSubmit = (e) => {
    e.preventDefault();
    saveInquiry('wallpaper', wallpaperClientName, wallpaperClientPhone, `${wallpaperWidth}m x ${wallpaperHeight}m`, wallpaperClientMessage);
    const msg = `Hello Two Line!\n\nI am interested in a Custom-made Wallpaper mural.\n- Name: ${wallpaperClientName}\n- Contact: ${wallpaperClientPhone}\n- Wall Size: ${wallpaperWidth}m width x ${wallpaperHeight}m height\n- Custom requests: ${wallpaperClientMessage}`;
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
    setShowWallpaperModal(false);
    setWallpaperClientName('');
    setWallpaperClientPhone('');
    setWallpaperWidth('');
    setWallpaperHeight('');
    setWallpaperClientMessage('');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  const filtered = useMemo(() => {
    let list = cat === 'all' ? products : products.filter(p => p.category === cat);
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'featured') list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [cat, sort, maxPrice]);

  const catLabels = {
    all: isAr ? 'الكل' : 'All Products',
    curtains: t.nav_curtains,
    blinds: t.nav_blinds,
    motorized: t.nav_motorized,
    sofa: isAr ? 'الكنب والجلوس' : 'Sofa & Seating',
    carpet: isAr ? 'السجاد والموكيت' : 'Carpets & Rugs',
    wallpaper: isAr ? 'ورق جدران فاخر' : 'Premium Wallpaper',
  };

  return (
    <main id="catalog-page" className="page-pop-enter" style={{ paddingTop: 48, paddingBottom: 96 }}>
      <div className="container">
        {/* Page header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t.products_title}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t.products_subtitle}</p>
        </div>

        <div className="catalog-layout">
          {/* Filter Panel */}
          <aside className="filter-panel" id="filter-panel">
            <div className="filter-title">
              <SlidersHorizontal size={18} />
              {isAr ? 'فلترة' : 'Filters'}
            </div>

            {/* Category */}
            <div className="filter-group">
              <div className="filter-group-label">{isAr ? 'الفئة' : 'Category'}</div>
              {categories.map(c => (
                <label key={c} className={`filter-option ${cat === c ? 'active' : ''}`} id={`filter-cat-${c}`}>
                  <input type="radio" name="category" checked={cat === c} onChange={() => setSearchParams({ cat: c })} />
                  {catLabels[c]}
                </label>
              ))}
            </div>

            {/* Price range */}
            <div className="filter-group">
              <div className="filter-group-label">{isAr ? 'الحد الأقصى للسعر' : 'Max Price'}</div>
              <div style={{ padding: '0 4px' }}>
                <input
                  type="range"
                  min={300}
                  max={6000}
                  step={100}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                  id="price-range-input"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
                  <span>300 {t.aed}</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-dark)' }}>{maxPrice} {t.aed}</span>
                </div>
              </div>
            </div>

            {/* Clear */}
            <button
              className="clear-filters"
              id="clear-filters-btn"
              onClick={() => { setSearchParams({ cat: 'all' }); setSort('featured'); setMaxPrice(6000); }}
            >
              {isAr ? 'مسح الفلاتر' : 'Clear Filters'}
            </button>
          </aside>

          {/* Products */}
          <div>
            {/* Sofa Custom Designer Button Banner */}
            {cat === 'sofa' && (
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(201,169,110,0.05) 100%)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--accent-light)',
                marginBottom: 24,
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-dark)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                      🛋️ {isAr ? 'تصميم كنب مخصص (تفصيل كنب)' : 'Custom-Made Sofa Creator'}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {isAr 
                        ? 'هل تبحث عن مقاس أو شكل أو نوع قماش محدد؟ صمم كنبتك الخاصة الآن واحصل على عرض سعر فوري.'
                        : 'Looking for a specific width, layout, or fabric? Custom-craft your sofa with us in Abu Dhabi & Dubai.'}
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    id="open-sofa-designer-btn"
                    onClick={() => setShowModal(true)}
                  >
                    📞 {isAr ? 'تواصل مع تو لاين' : 'Contact Two Line'}
                  </button>
                </div>
              </div>
            )}

            {/* Carpet Custom Designer Button Banner */}
            {cat === 'carpet' && (
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(201,169,110,0.05) 100%)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--accent-light)',
                marginBottom: 24,
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-dark)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                      🧶 {isAr ? 'تفصيل سجاد وموكيت مخصص' : 'Custom-Made Carpet & Rug Creator'}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {isAr 
                        ? 'هل تبحث عن مقاسات أو سجاد مخصص لغرفتك أو مجلسك؟ تفضل بطلب مقاس وسنصنعه لك.'
                        : 'Need a custom size, width, or length for your living room or Majlis? Let us custom craft it for you.'}
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    id="open-carpet-designer-btn"
                    onClick={() => setShowCarpetModal(true)}
                  >
                    📞 {isAr ? 'تواصل مع تو لاين' : 'Contact Two Line'}
                  </button>
                </div>
              </div>
            )}

            {/* Wallpaper Custom Designer Button Banner */}
            {cat === 'wallpaper' && (
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(201,169,110,0.05) 100%)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--accent-light)',
                marginBottom: 24,
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-dark)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                      📜 {isAr ? 'تصميم ورق جدران مخصص' : 'Custom-Made Wallpaper Creator'}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {isAr 
                        ? 'هل تبحث عن ورق جدران بمقاسات مخصصة لجدارك؟ تفضل بطلب الأبعاد وسيقوم خبراؤنا بالباقي.'
                        : 'Looking for a custom size mural or wallpaper for your wall? Submit your dimensions and our experts will handle the rest.'}
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    id="open-wallpaper-designer-btn"
                    onClick={() => setShowWallpaperModal(true)}
                  >
                    📞 {isAr ? 'تواصل مع تو لاين' : 'Contact Two Line'}
                  </button>
                </div>
              </div>
            )}

            {/* Top bar */}
            <div className="catalog-topbar">
              <p className="catalog-count">
                {filtered.length} {isAr ? 'منتج' : 'products'}
              </p>
              <select
                className="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
                id="sort-select"
              >
                <option value="featured">{isAr ? 'المميزة أولاً' : 'Featured First'}</option>
                <option value="price-asc">{isAr ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
                <option value="price-desc">{isAr ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {isAr ? 'لا توجد منتجات مطابقة' : 'No products match your filters'}
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            {/* More Designs CTA Box */}
            <div style={{
              marginTop: 48,
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '32px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
                ✨ {isAr ? 'هل تبحث عن تصاميم ونقوش أخرى؟' : 'Looking for More Designs?'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 540, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
                {isAr 
                  ? 'لدينا أكثر من 1,000 نوع من الأقمشة، ورق الجدران، ونقوش السجاد التراثية والعصرية المتوفرة في الكتالوج الكامل لدينا.' 
                  : 'We have 1,000+ fabrics, wallpapers, and custom carpet pattern catalogs available in our physical collection.'}
              </p>
              <a 
                href="https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture!%20I%20would%20like%20to%20see%20more%20designs%20and%20catalogs%20for%20my%20project."
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', margin: '0 auto' }}
              >
                📞 {isAr ? 'تواصل مع تو لاين' : 'Contact Two Line'}
              </a>
            </div>
          </div>
        </div>

      {/* Custom Sofa Modal Popup */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 20
        }}>
          <div className="page-pop-enter" style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl)',
            width: '100%',
            maxWidth: '500px',
            padding: 32,
            position: 'relative'
          }}>
            {/* Close button */}
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 24,
                right: isAr ? 'auto' : 24,
                left: isAr ? 24 : 'auto',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                borderRadius: '50%',
                background: 'var(--surface-2)',
                border: 'none'
              }}
              id="close-sofa-designer-btn"
              aria-label="Close custom sofa designer"
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              🛋️ {isAr ? 'تفصيل كنب مخصص' : 'Custom Sofa Designer'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
              {isAr 
                ? 'حدد خياراتك المفضلة للكنبة، وسيتواصل معك خبراؤنا مع تقديم عينات القماش والقياسات الدقيقة مجاناً!'
                : 'Select your preferred layout, material, and dimensions. Our workshop experts will contact you for custom samples!'}
            </p>

            <form onSubmit={handleSofaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Client Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'الاسم الكريم' : 'Your Name'}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={isAr ? 'أدخل اسمك هنا' : 'Enter your name'}
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Client Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Contact Phone / WhatsApp'}
                </label>
                <input 
                  type="tel"
                  required
                  placeholder="+971 XX XXX XXXX"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Client Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'تفاصيل الطلب (المقاس، نوع القماش، الشكل)' : 'Sofa Details (Sizing, Fabric, Shape)'}
                </label>
                <textarea 
                  required
                  rows="3"
                  placeholder={isAr ? 'اكتب تفاصيل الكنبة التي ترغب بتفصيلها...' : 'Describe the custom sofa you want to craft...'}
                  value={clientMessage}
                  onChange={e => setClientMessage(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                id="submit-sofa-quote-btn"
              >
                💬 {isAr ? 'إرسال الطلب عبر الواتساب' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Carpet Creator Modal */}
      {showCarpetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 16,
          animation: 'fadeIn 0.25s ease'
        }} onClick={() => setShowCarpetModal(false)}>
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: 480,
            padding: 32,
            position: 'relative',
            boxShadow: 'var(--shadow-xl)',
            animation: 'pagePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both'
          }} onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button 
              onClick={() => setShowCarpetModal(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ✕
            </button>

            <h3 style={{ color: 'var(--text)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 6 }}>
              🧶 {isAr ? 'طلب تفصيل سجاد مخصص' : 'Custom Carpet Creator'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 24 }}>
              {isAr 
                ? 'أدخل المقاسات المطلوبة وتفاصيل الاتصال وسيقوم مصممونا بالتواصل معك فوراً.' 
                : 'Enter your preferred sizing and contact details, and our design team will contact you immediately.'}
            </p>

            <form onSubmit={handleCarpetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Client Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'الاسم الكريم' : 'Your Name'}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={isAr ? 'أدخل اسمك هنا' : 'Enter your name'}
                  value={carpetClientName}
                  onChange={e => setCarpetClientName(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Client Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Contact Phone / WhatsApp'}
                </label>
                <input 
                  type="tel"
                  required
                  placeholder="+971 XX XXX XXXX"
                  value={carpetClientPhone}
                  onChange={e => setCarpetClientPhone(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Sizing inputs */}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {isAr ? 'العرض (متر)' : 'Width (meters)'}
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    min="0.5"
                    max="20"
                    placeholder="2.5"
                    value={carpetWidth}
                    onChange={e => setCarpetWidth(e.target.value)}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      fontSize: '0.9rem',
                      color: 'var(--text)'
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {isAr ? 'الطول المخصص (متر)' : 'Custom Length (meters)'}
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    min="0.5"
                    max="30"
                    placeholder="3.5"
                    value={carpetLength}
                    onChange={e => setCarpetLength(e.target.value)}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      fontSize: '0.9rem',
                      color: 'var(--text)'
                    }}
                  />
                </div>
              </div>

              {/* Client Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'تفاصيل إضافية (اللون، السمك، نوع النقش)' : 'Additional Details (Color, Pile, Pattern)'}
                </label>
                <textarea 
                  rows="3"
                  placeholder={isAr ? 'اكتب أي متطلبات خاصة بالنقش أو السمك...' : 'Describe any specific requests (e.g. thickness, style)...'}
                  value={carpetClientMessage}
                  onChange={e => setCarpetClientMessage(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                id="submit-carpet-quote-btn"
              >
                💬 {isAr ? 'إرسال طلب السجاد' : 'Submit Carpet Sizing Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Wallpaper Creator Modal */}
      {showWallpaperModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 16,
          animation: 'fadeIn 0.25s ease'
        }} onClick={() => setShowWallpaperModal(false)}>
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: 480,
            padding: 32,
            position: 'relative',
            boxShadow: 'var(--shadow-xl)',
            animation: 'pagePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both'
          }} onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button 
              onClick={() => setShowWallpaperModal(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ✕
            </button>

            <h3 style={{ color: 'var(--text)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 6 }}>
              📜 {isAr ? 'طلب ورق جدران مخصص' : 'Custom Wallpaper Creator'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 24 }}>
              {isAr 
                ? 'أدخل أبعاد الجدار وتفاصيل الاتصال وسيقوم فريقنا بالتواصل معك فوراً.' 
                : 'Enter your wall dimensions and contact details, and our design team will contact you immediately.'}
            </p>

            <form onSubmit={handleWallpaperSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Client Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'الاسم الكريم' : 'Your Name'}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={isAr ? 'أدخل اسمك هنا' : 'Enter your name'}
                  value={wallpaperClientName}
                  onChange={e => setWallpaperClientName(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Client Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Contact Phone / WhatsApp'}
                </label>
                <input 
                  type="tel"
                  required
                  placeholder="+971 XX XXX XXXX"
                  value={wallpaperClientPhone}
                  onChange={e => setWallpaperClientPhone(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Wall dimensions */}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {isAr ? 'عرض الجدار (متر)' : 'Wall Width (meters)'}
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    min="0.5"
                    max="50"
                    placeholder="4.0"
                    value={wallpaperWidth}
                    onChange={e => setWallpaperWidth(e.target.value)}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      fontSize: '0.9rem',
                      color: 'var(--text)'
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {isAr ? 'ارتفاع الجدار (متر)' : 'Wall Height (meters)'}
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    min="0.5"
                    max="10"
                    placeholder="3.0"
                    value={wallpaperHeight}
                    onChange={e => setWallpaperHeight(e.target.value)}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      fontSize: '0.9rem',
                      color: 'var(--text)'
                    }}
                  />
                </div>
              </div>

              {/* Client Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {isAr ? 'طلبات مخصصة (نوع التصميم، ألوان معينة)' : 'Custom Requests (Style, Colors, Textures)'}
                </label>
                <textarea 
                  rows="3"
                  placeholder={isAr ? 'اكتب أي متطلبات خاصة بالنقش أو التصميم...' : 'Describe style preferences, texture requests...'}
                  value={wallpaperClientMessage}
                  onChange={e => setWallpaperClientMessage(e.target.value)}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                id="submit-wallpaper-quote-btn"
              >
                💬 {isAr ? 'إرسال طلب ورق الجدران' : 'Submit Wallpaper Sizing Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification Alert Toast */}
      {showSuccessAlert && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '16px 28px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: 600,
          fontSize: '0.95rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'pagePop 0.35s ease both'
        }} id="sofa-success-toast">
          <span style={{ fontSize: '1.2rem' }}>✨</span>
          <div>
            {isAr 
              ? 'شكراً لك! سيتواصل معك فريق المبيعات لدينا فوراً.' 
              : 'Thank you! Our sales team will contact you immediately.'}
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
