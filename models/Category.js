const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);
