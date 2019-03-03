const db = require('../dbConfig');

module.exports = {
  get,
  getById,
  getBy,
  add
};

function get() {
  return db('users');
}

function getBy(username) {
  return db('users')
    .where({ username })
    .first();
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
