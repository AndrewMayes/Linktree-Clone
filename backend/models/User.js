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

// Create User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  links: {
    type: [LinkSchema]
  }
});

module.exports = User = mongoose.model('user', UserSchema);