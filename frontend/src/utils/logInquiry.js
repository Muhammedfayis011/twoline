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
export async function logInquiry({ type, name, phone = '—', details = '', dimensions = '' }) {
  try {
    const payload = { type, name, phone, details, dimensions };
    
    // Send to our new Node.js MongoDB backend
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${API_URL}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    // Also keep local storage as a fallback/backup just in case backend is offline
    const saved = localStorage.getItem('twoline_inquiries');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift({
      id: Date.now(),
      ...payload,
      date: new Date().toLocaleString('en-GB'),
    });
    localStorage.setItem('twoline_inquiries', JSON.stringify(list));
    
  } catch (err) {
    console.error('Error logging inquiry:', err);
    // Silently fail — never block WhatsApp opening
  }
}
