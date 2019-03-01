const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api', userRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = server;
