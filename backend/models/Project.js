const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  titleEn: {
    type: String,
    required: true,
  },
  titleAr: {
    type: String,
    required: true,
  },
  locationEn: {
    type: String,
    required: true,
  },
  locationAr: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // This will be the Cloudinary URL
  },
  cloudinaryId: {
    type: String, // Keep track of the image ID so we can delete it from Cloudinary later
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
