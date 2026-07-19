import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CompletedWorksPage from './pages/CompletedWorksPage';
import AdminPage from './pages/AdminPage';
import { logInquiry } from './utils/logInquiry';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out at 2.2s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Completely remove preloader from tree at 3.0s
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className={`preloader-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="preloader-card">
            <div className="preloader-brand">
              Two Line <span>Furniture</span>
              <div style={{ fontSize: '0.62rem', color: 'var(--accent-light)', fontWeight: 700, letterSpacing: '0.12em', marginTop: '6px', textTransform: 'uppercase', opacity: 0.9 }}>
                Established 2008
              </div>
            </div>
            <div className="preloader-spinner"></div>
          </div>
        </div>
      )}
      <Navbar />
      <CartDrawer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/completed-works" element={<CompletedWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '120px 24px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent)' }}>404</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Page not found</p>
            <a href="/" className="btn btn-primary">Go Home</a>
          </div>
        } />
      </Routes>

      <Footer />

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => {
          logInquiry({ type: 'WhatsApp Float', name: 'Visitor (Float Button)', details: 'Clicked the floating WhatsApp button.' });
          window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20your%20services.%20Please%20contact%20me.', '_blank');
        }}
        className="whatsapp-float"
        id="whatsapp-floating"
        aria-label="Chat on WhatsApp"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        💬 WhatsApp
      </button>
    </>
  );
}
