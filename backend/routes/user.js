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
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route GET /users/:username
// @desc Get user by username
// @access Public
router.get('/:username', (req, res) => {
  const username = req.params.username
  User.findOne({ "username": new RegExp(username, "i") })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST /users
// @desc Create a user
// @access Public
router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route PATCH /users/:username
// @desc Add a link to the user's links
// @access Public
router.patch('/:username', (req, res) => {
  const username = req.params.username
  User.findOne({ "username": new RegExp(username, "i") })
    .then(user => {
      const url = req.body.url;
      const linkTitle = req.body.linkTitle;
      user.links.push({"url": url, "linkTitle": linkTitle})
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route DELETE /users/:username
// @desc Delete a user by username
// @access Public
router.delete('/:username', (req, res) => {
  const username = req.params.username
  User.deleteOne({ "username": new RegExp(username, "i") })
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;