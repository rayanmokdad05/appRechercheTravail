const mongoose = require("mongoose");

const travailSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Travail", travailSchema);
