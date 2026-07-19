require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));
} else {
  console.log('WARNING: MONGO_URI is missing in .env file. Database not connected.');
}

// Routes
const inquiryRoutes = require('./routes/inquiries');
app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('TWO LINE API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
