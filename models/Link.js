const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Link Schema
const LinkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  linkTitle: {
    type: String,
    required: true
  }
});

module.exports = Link = mongoose.model('link', LinkSchema);