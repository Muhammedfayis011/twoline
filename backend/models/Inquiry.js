const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, default: '—' },
  details: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
