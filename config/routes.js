const router = require('express').Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const users = require('../database/models/user-models');

const secret =
  process.env.SECRET || 'this is a backup secret if there is no .env secret.';

// generate token
const generateToken = user => {
  const payload = {
    subject: user.id
  };
  const options = {
    expiresIn: '30m'
  };

  return jwt.sign(payload, secret, options);
};

// user registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: 'Missing credentials, please try again.'
    });
  }

  users
    .add(newUser)
    .then(user => {
      if (user) {
        const token = generateToken(user);
        res.status(200).json({ success: true, userId: user.id, token });
      } else {
        res
          .status(500)
          .json({ success: false, message: 'Failed to register user.' });
      }
    })
    .catch(err => console.log(err));
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
