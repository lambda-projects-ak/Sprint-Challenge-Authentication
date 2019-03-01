const router = require('express').Router();
const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const users = require('../database/models/user-models');

// user registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: 'Missing credentials, please try again.'
    });
  }

  user.add();

  res.status(200).json({ success: true });
});

// user login
router.post('/login', (req, res) => {
  res.status(200).json({ success: true });
});

// get users
router.get('/users', (req, res) => {
  users.get().then(users => res.status(200).json({ success: true, users }));
});

// get jokes
router.get('/jokes', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
