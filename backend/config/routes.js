const router = require('express').Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const users = require('../database/models/user-models');

const secret =
  process.env.JWT_SECRET ||
  'this is a backup secret if you cannot access a .env secret.';

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

  // hash user password here
  const hash = bcrypt.hashSync(newUser.password, 5);
  // assign hash pw to newUser.password
  newUser.password = hash;

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
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: 'Missing credentials, please try again.'
    });
  }

  users
    .getBy(username)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ success: true, userId: user.id, token });
      } else {
        res.status(500).json({
          success: false,
          message: 'Invalid credentials, please try again.'
        });
      }
    })
    .catch(err => console.log(err));
});

// get users
router.get('/users', authenticate, (req, res) => {
  users.get().then(users => res.status(200).json({ success: true, users }));
});

// get jokes
router.get('/jokes', authenticate, (req, res) => {
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
