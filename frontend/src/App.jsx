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
import TwoLineAssistant from './components/TwoLineAssistant/TwoLineAssistant';

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
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </button>

      {/* Two Line AI Assistant Widget */}
      <TwoLineAssistant />
    </>
  );
}
