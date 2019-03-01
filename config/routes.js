const router = require('express').Router();
const axios = require('axios');

const { authenticate } = require('../auth/authenticate');

router.post('/register', (req, res) => {
  // implement user registration
  res.status(200).json({ success: true });
});

router.post('/login', (req, res) => {
  res.status(200).json({ success: true });
});

function getJokes(req, res) {
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
}

module.exports = router;
