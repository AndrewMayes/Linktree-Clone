const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

// Create Express server
const app = express();

// Server port
const port = process.env.PORT || 5000;

// Cors Middleware
app.use(cors());

// Make uploads folder public
app.use('/uploads', express.static('uploads'));

// Parse json
app.use(express.json());

// mongoDB Atlas connection string
const uri = process.env.ATLAS_URI;

// Database Connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.log(err));

// Bring in Routes
const users = require('./routes/user');

// Use Routes
app.use('/users', users);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use("/Linktree-Clone/", express.static("client/build"));

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Starts the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})