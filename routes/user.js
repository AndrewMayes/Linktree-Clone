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
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({msg: 'Please enter all fields'})
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({msg: 'User already exists'})
      }

      const newUser = new User({
        username,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
});

// @route POST /users/auth
// @desc Auth user (Login)
// @access Public
router.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({msg: 'Please enter all fields'})
  }

  // Check for existing user
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'User does not exist'})
      }

      // Validate Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              });
            }
          )
        })
      })
});





module.exports = router;