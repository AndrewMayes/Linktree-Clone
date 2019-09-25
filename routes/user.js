const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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
  const queryUsername = '^' + username + '$'
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route PATCH /users/:username
// @desc Add a link a specific user's links
// @access Public
router.patch('/:username', (req, res) => {
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
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



// Auth routes

const jwtSecret = process.env.jwtSecret;

// @route POST /users
// @desc Create a user (Register)
// @access Public
router.post('/', async (req, res) => {

  const { username, email, password } = req.body;

  // Check if the email is already in the database
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send('Email already exists');

  // Check if the username is already in the database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) return res.status(400).send('Username already exists');

  // Salt and Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    res.send({ newUser: savedUser._id });
  } catch(err) {
    res.status(400).send(err);
  } 
});

// @route POST /users/auth
// @desc Auth user (Login)
// @access Public
router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  // Check if username exists
  const userExists = await User.findOne({ username });
  if (!userExists) return res.status(400).send('Username not found');

  // Password is correct
  const validPass = await bcrypt.compare(password, userExists.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ _id: userExists._id }, process.env.jwtSecret);
  res.header('auth-token', token).send(token);

});





module.exports = router;