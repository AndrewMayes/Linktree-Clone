const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    //Max 5mb file size
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

require('dotenv').config();

// User Model
const User = require('../models/User');

// @route GET /users
// @desc Get all users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .select('-password -email')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET /users/admin
// @desc Get user data
// @access Private
router.get('/admin', verify, (req, res) => {
  User.findById(req.user._id)
  .select('-password -email')
  .then(user => res.send(user));
});

// @route GET /users/:username
// @desc Get user by username
// @access Public
router.get('/:username', (req, res) => {
  const username = req.params.username
  const queryUsername = '^' + username + '$'
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route PATCH /users/:username
// @desc Add a link a specific user's links
// @access Private
router.patch('/:username', verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
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

/*
// @route DELETE /users/:username
// @desc Delete a user by username
// @access Private
router.delete('/:username', verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.deleteOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

// @route PATCH /users/:username/deletelink
// @desc Delete a link
// @access Private
router.patch('/:username/deletelink', verify, (req, res) => {
  const username = req.params.username;
  const { _id } = req.body;
  const queryUsername = '^' + username + '$';

  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => {

      user.links.forEach((link, index) => {
        
        if (link._id.toString() === _id.toString()) {
          user.links.splice(index, 1);
          user.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      });
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route PATCH /users/:username/link
// @desc Update a link
// @access Private
router.patch('/:username/editlink', verify, (req, res) => {
  const username = req.params.username;
  const { _id } = req.body;
  const queryUsername = '^' + username + '$';

  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => {

      user.links.forEach((link, index) => {
        
        if (link._id.toString() === _id.toString()) {
          const url = req.body.url;
          const linkTitle = req.body.linkTitle;

          user.links[index] = {"_id": _id, "url": url, "linkTitle": linkTitle}
          user.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      });
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route PATCH /users/:username/theme
// @desc Update a user's Linktree theme
// @access Private
router.patch('/:username/theme', verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => {
      const theme = req.body.theme;
      user.theme = parseInt(theme);
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route PATCH /users/:username/avatar
// @desc Update a user's avatar
// @access Private
router.patch('/:username/avatar', verify, upload.single('userAvatar'), (req, res) => {
  console.log(req.file);
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => {
      const avatar = req.file.path;
      user.avatar = avatar;
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// @route PATCH /users/:username/defaultAvatar
// @desc Update a user's avatar to the default avatar picture
// @access Private
router.patch('/:username/defaultAvatar', verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = '^' + username + '$';
  User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } })
    .select('-password -email')
    .then(user => {
      user.avatar = 'uploads/default.png';
      user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
});


// Login/Register routes

const jwtSecret = process.env.jwtSecret;

// @route POST /users/register
// @desc Create a user (Register)
// @access Public
router.post('/register', async (req, res) => {

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
    
    // Create a token
    const token = jwt.sign({ _id: savedUser._id }, process.env.jwtSecret);

    // Send token to header
    res.header('auth-token', token).send(token);
  } catch(err) {
    res.status(400).send(err);
  } 
});

// @route POST /users/login
// @desc Auth user (Login)
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const queryUsername = '^' + username + '$';
  const queryEmail = '^' + username + '$';
  
  // Check if username or email exists --> Check if password is correct --> Create jwt token --> Send token to header
  const userExists = await User.findOne({ "username": { '$regex': queryUsername, $options: 'i' } });
  if (!userExists) {
    const emailExists = await User.findOne({ "email": { '$regex': queryEmail, $options: 'i' } });
    if (!emailExists) {
      return res.status(400).send('Username/Email not found');
    } else {
      const validPass = await bcrypt.compare(password, emailExists.password);
      if (!validPass) return res.status(400).send('Invalid password');
      const token = jwt.sign({ _id: emailExists._id }, process.env.jwtSecret);
      res.header('auth-token', token).send(token);
    }
  } else {
    const validPass = await bcrypt.compare(password, userExists.password);
    if (!validPass) return res.status(400).send('Invalid password');
    const token = jwt.sign({ _id: userExists._id }, process.env.jwtSecret);
    res.header('auth-token', token).send(token);
  }
});

module.exports = router;