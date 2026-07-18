import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock } from '../icons';
import { useLanguage } from '../context/LanguageContext';
import { logInquiry } from '../utils/logInquiry';

export default function ContactPage() {
  const { t, isAr } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    
    // Save to localStorage inquiries database
    const saved = localStorage.getItem('twoline_inquiries');
    let list = [];
    if (saved) {
      try { list = JSON.parse(saved); } catch (err) { list = []; }
    }
    const newInquiry = {
      id: Date.now(),
      type: 'contact',
      name: form.name,
      phone: form.phone,
      dimensions: form.email ? `Email: ${form.email}` : null,
      details: form.message,
      date: new Date().toLocaleString()
    };
    list.unshift(newInquiry);
    localStorage.setItem('twoline_inquiries', JSON.stringify(list));

    const msg = `Hello Two Line!\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(`https://wa.me/971542395964?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactRows = [
    {
      icon: <MessageCircle size={20} />,
      label: t.contact_whatsapp,
      value: (
        <a href="https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote.%20Please%20contact%20me." target="_blank" rel="noreferrer">+971 54 239 5964</a>
      ),
      id: 'contact-whatsapp',
    },
    {
      icon: <Phone size={20} />,
      label: t.contact_phone,
      value: <a href="tel:+971542395964">+971 54 239 5964</a>,
      id: 'contact-phone',
    },
    {
      icon: <Mail size={20} />,
      label: t.contact_email,
      value: <a href="mailto:info@twoline.ae">info@twoline.ae</a>,
      id: 'contact-email',
    },
    {
      icon: <MapPin size={20} />,
      label: t.contact_address,
      value: (
        <>
          Two Line Furniture<br />
          Al Bahia, Abu Dhabi, UAE<br />
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-dark)', fontWeight: 600 }}>
            {isAr ? 'منطقة الخدمة: أبوظبي ودبي بأكملها' : 'Service Area: Entire Abu Dhabi & Dubai'}
          </span>
        </>
      ),
      id: 'contact-address',
    },
    {
      icon: <Clock size={20} />,
      label: t.contact_hours,
      value: t.contact_hours_val,
      id: 'contact-hours',
    },
  ];

  return (
    <main id="contact-page" className="page-pop-enter">
      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <div className="section-tag" style={{ color: 'var(--accent)', borderColor: 'rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.1)', marginBottom: 20 }}>
            📞 {isAr ? 'تواصل معنا' : 'Get in Touch'}
          </div>
          <h1>{t.contact_title}</h1>
          <p>{t.contact_subtitle}</p>

          {/* WhatsApp fast CTA */}
          <button
            onClick={() => {
              logInquiry({ type: 'WhatsApp — Contact Page', name: 'Visitor (Contact Page)', details: 'Clicked WhatsApp button on Contact page hero.' });
              window.open('https://wa.me/971542395964?text=Hello%20Two%20Line%20Furniture%2C%20I%20would%20like%20to%20get%20a%20quote.%20Please%20contact%20me.', '_blank');
            }}
            className="btn btn-whatsapp btn-lg"
            style={{ marginTop: 28 }}
            id="contact-whatsapp-btn"
          >
            💬 {t.contact_whatsapp}
          </button>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info card */}
            <div className="contact-info-card">
              <h2 className="contact-info-title">
                {isAr ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              {contactRows.map(row => (
                <div key={row.id} className="contact-row" id={row.id}>
                  <div className="contact-row-icon">{row.icon}</div>
                  <div>
                    <div className="contact-row-label">{row.label}</div>
                    <div className="contact-row-value">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="contact-form-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 28 }}>
                {isAr ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h2>

              {submitted && (
                <div className="form-success">
                  ✅ {t.form_success}
                </div>
              )}

              <form onSubmit={handleSubmit} id="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">{t.form_name} *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="form-input"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={isAr ? 'اسمك الكامل' : 'Your full name'}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">{t.form_email}</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="form-input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">{t.form_phone} *</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    className="form-input"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+971 50 000 0000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">{t.form_message} *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder={isAr ? 'أخبرنا عن متطلباتك...' : 'Tell us about your requirements...'}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} id="contact-submit-btn">
                  💬 {t.form_submit}
                </button>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
                  {isAr ? 'ستُرسل رسالتك عبر واتساب مباشرةً' : 'Your message will be sent directly via WhatsApp'}
                </p>
              </form>
            </div>
          </div>

          {/* Google Map of Al Bahia, Abu Dhabi */}
          <div style={{ marginTop: 48, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', height: '400px' }}>
            <iframe 
              title="Two Line Furniture Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14529.564538805908!2d54.67389815042654!3d24.437198751509995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e408ec2284af3%3A0xb35a7a726615b8ee!2sAl%20Bahia%20-%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </main>
  );
}
