const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/User');

// @route GET /users
// @desc Get user
// @access Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(user => res.json(user))
});

// @route GET /users/:username
// @desc Get user by username
// @access Public
router.get('/:username', (req, res) => {
  User.find({ "username": req.params.username })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({success: false}))
});

// @route POST /users
// @desc Create a user
// @access Public
router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username
  });

  newUser.save().then(user => res.json(user));
});

// @route PATCH /users/:id
// @desc Create a link
// @access Public
router.patch('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      let url = req.body.url;
      let linkTitle = req.body.linkTitle;
      user.links.push({"url": url, "linkTitle": linkTitle})
      user.save().then(user => res.json(user))
    })
    .catch(err => res.status(404).json({success: false}))
});

// @route DELETE /users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;