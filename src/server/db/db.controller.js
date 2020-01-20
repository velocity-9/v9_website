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

module.exports.getUserFunctions = (req, res) => {
  db.any('SELECT users.github_username, components.github_repo, components.deployment_status FROM users, components WHERE users.user_id = components.user_id AND github_username=$1;', 'test')
  .then((data) => {
    console.log('Query results: ', data);
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR: ', error);
    res.json([]);
  });
};
