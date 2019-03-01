const db = require('../dbConfig');

module.exports = {
  get,
  getById,
  add
};

function get() {
  return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(([id]) => getById(id));
}
