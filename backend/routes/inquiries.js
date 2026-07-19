const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// @route   GET /api/inquiries
// @desc    Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/inquiries
// @desc    Create an inquiry
router.post('/', async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const savedInquiry = await newInquiry.save();
    res.json(savedInquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
