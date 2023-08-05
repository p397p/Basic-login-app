
// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Route for displaying the login form
router.get('/login', (req, res) => {
  res.render('login', { error: null }); // Pass the error variable as an object
});

// Route for handling user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'User not found' });
    }

    // Compare passwords (You need to implement this method in your User model)
    if (user.comparePassword(password)) {
      // Successful login
      // Here, you can redirect the user to the dashboard or any other protected route
      return res.redirect('/');
    } else {
      return res.render('login', { error: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

// Dashboard route, accessible after successful login
router.get('/', async (req, res) => {
  try {
    // Fetch the users from the database
    const users = await User.find();
    
    // Render the index.ejs template with the users data
    res.render('index', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

