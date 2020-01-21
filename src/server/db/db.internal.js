const pgp = require('pg-promise')();
const config = require('../../../config');

const cn = {
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD
};

const db = pgp(cn);

module.exports.doesUserExist = (username) => {
  db.one('SELECT github_username FROM users WHERE github_username=$1', username)
  .then((data) => {
    return true;
  })
  .catch((error) => {
    return false;
  });
};