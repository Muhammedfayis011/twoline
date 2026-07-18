import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Globe, ChevronDown, Menu, X, MoreVertical } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { logInquiry } from '../../utils/logInquiry';

export default function Navbar() {
  const { t, toggleLang, lang, isAr } = useLanguage();
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header>
      {/* Announcement Banner */}
      <div className="announcement-banner">
        <div className="announcement-scroll">
          {[...Array(6)].map((_, i) => (
            <span key={i}>{t.banner_text}</span>
          ))}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)} style={{ lineHeight: 1.1 }}>
                Two Line <span>Furniture</span>
              </Link>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-dark)', fontWeight: 700, letterSpacing: '0.05em', marginTop: '2px', textTransform: 'uppercase' }}>
                {isAr ? 'تأسست عام 2008' : 'Established 2008'}
              </span>
            </div>

            {/* Desktop Nav */}
            <ul className="navbar-nav">
              <li><NavLink to="/">{t.nav_home}</NavLink></li>
              <li className="nav-dropdown">
                <a style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px' }}>
                  {t.nav_products} <ChevronDown size={14} />
                </a>
                <div className="dropdown-menu">
                  <Link to="/catalog?cat=curtains">🪟 {t.nav_curtains}</Link>
                  <Link to="/catalog?cat=blinds">🏠 {t.nav_blinds}</Link>
                  <Link to="/catalog?cat=motorized">⚡ {t.nav_motorized}</Link>
                  <Link to="/catalog?cat=sofa">🛋️ {isAr ? 'الكنب والجلوس' : 'Sofa & Seating'}</Link>
                  <Link to="/catalog?cat=carpet">🧶 {isAr ? 'السجاد والموكيت' : 'Carpets & Rugs'}</Link>
                  <Link to="/catalog?cat=wallpaper">📜 {isAr ? 'ورق جدران فاخر' : 'Premium Wallpaper'}</Link>
                </div>
              </li>
              <li><NavLink to="/completed-works">{isAr ? 'أعمالنا' : 'Works'}</NavLink></li>
              <li><NavLink to="/about">{t.nav_about}</NavLink></li>
              <li><NavLink to="/contact">{t.nav_contact}</NavLink></li>
            </ul>

            {/* Actions */}
            <div className="navbar-actions">
              <button className="lang-toggle" onClick={toggleLang} id="lang-toggle-btn">
                <Globe size={14} />
                {lang === 'en' ? 'AR' : 'EN'}
              </button>

              <button
                id="cart-btn"
                className="cart-btn"
                onClick={() => setIsOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>

              <button
                className="btn btn-primary btn-sm"
                id="nav-book-btn"
                onClick={() => {
                  logInquiry({ type: 'WhatsApp — Navbar', name: 'Visitor (Navbar)', details: 'Clicked Get Quote from Navbar.' });
                  window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20your%20services.', '_blank');
                }}
              >
                {t.nav_book}
              </button>

              {/* Three dot admin portal menu */}
              <div className="nav-dropdown" style={{ position: 'relative' }}>
                <button
                  id="admin-portal-btn"
                  className="cart-btn"
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  aria-label="Admin settings"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <MoreVertical size={18} />
                </button>
                {showAdminDropdown && (
                  <div className="dropdown-menu" style={{ 
                    display: 'block', 
                    position: 'absolute', 
                    top: '100%', 
                    right: isAr ? 'auto' : 0, 
                    left: isAr ? 0 : 'auto', 
                    minWidth: 150, 
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--surface-2)',
                    zIndex: 1000
                  }}>
                    <Link 
                      to="/admin" 
                      onClick={() => setShowAdminDropdown(false)}
                      style={{ padding: '10px 16px', display: 'block', fontSize: '0.85rem', fontWeight: 650, color: 'var(--text)' }}
                    >
                      🔑 {isAr ? 'بوابة المسؤول' : 'Admin Portal'}
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="mobile-menu-btn"
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
            <NavLink to="/" onClick={() => setMobileOpen(false)}>{t.nav_home}</NavLink>
            <NavLink to="/catalog?cat=curtains" onClick={() => setMobileOpen(false)}>🪟 {t.nav_curtains}</NavLink>
            <NavLink to="/catalog?cat=blinds" onClick={() => setMobileOpen(false)}>🏠 {t.nav_blinds}</NavLink>
            <NavLink to="/catalog?cat=motorized" onClick={() => setMobileOpen(false)}>⚡ {t.nav_motorized}</NavLink>
            <NavLink to="/catalog?cat=sofa" onClick={() => setMobileOpen(false)}>🛋️ {isAr ? 'الكنب والجلوس' : 'Sofa & Seating'}</NavLink>
            <NavLink to="/catalog?cat=carpet" onClick={() => setMobileOpen(false)}>🧶 {isAr ? 'السجاد والموكيت' : 'Carpets & Rugs'}</NavLink>
            <NavLink to="/catalog?cat=wallpaper" onClick={() => setMobileOpen(false)}>📜 {isAr ? 'ورق جدران فاخر' : 'Premium Wallpaper'}</NavLink>
            <NavLink to="/completed-works" onClick={() => setMobileOpen(false)}>✨ {isAr ? 'أعمالنا' : 'Works'}</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}>{t.nav_about}</NavLink>
            <NavLink to="/contact" onClick={() => setMobileOpen(false)}>{t.nav_contact}</NavLink>
            <div style={{ padding: '8px 16px', marginTop: '8px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  logInquiry({ type: 'WhatsApp — Mobile Nav', name: 'Visitor (Mobile Nav)', details: 'Clicked Get Quote from mobile menu.' });
                  window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20your%20services.', '_blank');
                  setMobileOpen(false);
                }}
              >
                {t.nav_book}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
