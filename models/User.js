const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Link Schema
const LinkSchema = require('./Link').schema;

// Create User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  theme: {
    type: Number,
    default: 1
  },
  avatar: {
    type: String,
    default: 'uploads/default.png'
  },
  links: {
    type: [LinkSchema]
  }
});

module.exports = User = mongoose.model('user', UserSchema);