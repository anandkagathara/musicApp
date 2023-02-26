// models/audio.js

const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Audio", audioSchema);
