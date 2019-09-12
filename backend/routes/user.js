const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/User');

// @route GET api/user
// @desc Get user
// @access Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(user => res.json(user))
});


module.exports = router;