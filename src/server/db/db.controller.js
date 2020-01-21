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
  db.any('SELECT users.github_username, components.github_repo, components.deployment_status FROM users, components WHERE users.user_id = components.user_id')
  .then((data) => {
    // console.log('Query results: ', data);
    res.json(data);
  });
};

module.exports.getComponentStatus = (req, res) => {
  const componentName = req.query.component;

  db.any('SELECT components.github_repo, stats.received_time, stats.color, stats.stat_window_seconds, stats.hits, stats.avg_response_bytes, stats.avg_ms_latency, workers.worker_name FROM stats, workers, components WHERE stats.component_id=components.component_id AND components.github_repo=$1 AND stats.worker_id=workers.worker_id', componentName)
  .then((data) => {
    res.json(data);
  });
};

module.exports.getComponentLogs = (req, res) => {
  const componentName = req.query.component;
  db.any('SELECT components.github_repo, logs.execution_num, logs.log_text, logs.log_error FROM components, logs WHERE logs.component_id=components.component_id AND components.github_repo=$1;', componentName)
  .then((data) => {
    console.log(data);
    res.json(data);
  });
};

