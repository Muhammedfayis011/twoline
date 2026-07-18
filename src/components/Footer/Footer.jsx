import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook as FacebookIcon } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { logInquiry } from '../../utils/logInquiry';

export default function Footer() {
  const { t, isAr } = useLanguage();

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ lineHeight: 1.1 }}>Two Line <span>Furniture</span></h3>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-light)', fontWeight: 700, letterSpacing: '0.05em', marginTop: '4px', textTransform: 'uppercase' }}>
                {t.footer_rights.includes('جميع الحقوق') ? 'تأسست عام 2008' : 'Established 2008'}
              </span>
            </div>
            <p className="footer-tagline">{t.footer_tagline}</p>
            <p className="footer-company">{t.footer_company}</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/get.twoline/"
                target="_blank" rel="noreferrer"
                className="social-link" id="footer-instagram"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://web.facebook.com/getcurtains"
                target="_blank" rel="noreferrer"
                className="social-link" id="footer-facebook"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <button
                onClick={() => { logInquiry({ type: 'WhatsApp — Footer Icon', name: 'Visitor (Footer)', details: 'Clicked WhatsApp icon in footer.' }); window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote.%20Please%20contact%20me.', '_blank'); }}
                className="social-link" id="footer-whatsapp"
                aria-label="WhatsApp"
                style={{ border: 'none', cursor: 'pointer', background: 'none', padding: 0 }}
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer_links}</h4>
            <ul>
              <li><Link to="/" id="footer-home">🏠 {t.nav_home}</Link></li>
              <li><Link to="/catalog?cat=curtains" id="footer-curtains">🪟 {t.nav_curtains}</Link></li>
              <li><Link to="/catalog?cat=blinds" id="footer-blinds">🏠 {t.nav_blinds}</Link></li>
              <li><Link to="/catalog?cat=motorized" id="footer-motorized">⚡ {t.nav_motorized}</Link></li>
              <li><Link to="/completed-works" id="footer-completed">✨ {isAr ? 'أعمالنا' : 'Works'}</Link></li>
              <li><Link to="/about" id="footer-about">{t.nav_about}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer_services}</h4>
            <ul>
              <li><a href="#products">{t.prod_sheer}</a></li>
              <li><a href="#products">{t.prod_blackout}</a></li>
              <li><a href="#products">{t.prod_motorized}</a></li>
              <li><a href="#products">{t.prod_roller_blackout}</a></li>
              <li><a href="#products">{t.prod_zebra}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer_contact}</h4>
            <div className="footer-contact-item">
              <MessageCircle size={14} />
              <button onClick={() => { logInquiry({ type: 'WhatsApp — Footer Number', name: 'Visitor (Footer)', details: 'Clicked WhatsApp number in footer.' }); window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote.%20Please%20contact%20me.', '_blank'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}>+971 54 239 5964</button>
            </div>
            <div className="footer-contact-item">
              <Mail size={14} />
              <a href="mailto:info@twoline.ae">info@twoline.ae</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={14} />
              <span style={{ fontSize: '0.8rem' }}>Al Bahia, Abu Dhabi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div className="footer-bottom">
            <span>{t.footer_rights}</span>
            <div className="footer-bottom-links">
              <a href="#" id="footer-privacy">{t.footer_privacy}</a>
              <a href="#" id="footer-terms">{t.footer_terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
