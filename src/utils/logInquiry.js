/**
 * Logs any inquiry (WhatsApp click, form submit, product quote) to localStorage
 * so it appears in the Admin Panel inquiries tab.
 *
 * @param {object} data
 * @param {string} data.type      - e.g. 'whatsapp', 'contact', 'sofa', 'carpet', 'wallpaper', 'product'
 * @param {string} data.name      - Customer name or source label
 * @param {string} [data.phone]   - Customer phone (optional)
 * @param {string} [data.details] - Full message / details text
 * @param {string} [data.dimensions] - Extra info line (product, location, email…)
 */
export function logInquiry({ type, name, phone = '—', details = '', dimensions = '' }) {
  try {
    const saved = localStorage.getItem('twoline_inquiries');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift({
      id: Date.now(),
      type,
      name,
      phone,
      dimensions,
      details,
      date: new Date().toLocaleString('en-GB'),
    });
    localStorage.setItem('twoline_inquiries', JSON.stringify(list));
  } catch (_) {
    // Silently fail — never block WhatsApp opening
  }
}
