const mongoose = require("mongoose");

const PhotoCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  photoImage: {
    type: String,
    required: true,
  },
});

module.exports = PhotoCategory = mongoose.model(
  "photoCategory",
  PhotoCategorySchema
);
