import 'dotenv/config';
import pgp from 'pg-promise';

class Database {
  constructor() {
    const connection = {
      host: 'v9_dep_mgr.patcody.io',
      port: 5432,
      database: 'v9',
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
    };
    this.db = pgp()(connection);
    //this.db = pgp(connection);
  }

  getUserComponents(username) {
    return this.db.any(
      'SELECT users.github_username, components.github_repo FROM users, components WHERE users.user_id = components.user_id AND users.github_username=$1',
      username)
    .then((data) => data);
  }

  getComponentStatus(username, componentName) {
    return this.db.any(
      'SELECT c.github_repo, s.received_time, s.color, s.stat_window_seconds, s.hits, s.avg_response_bytes, s.avg_ms_latency, w.worker_name FROM stats s JOIN components c on s.component_id = c.component_id JOIN users u on c.user_id = u.user_id JOIN workers w on s.worker_id = w.worker_id WHERE u.github_username = $1 AND c.github_repo = $2 ORDER BY s.received_time;',
      [username, componentName])
    .then((data) => data);
  }

  getComponentLogs(username, componentName) {
    return this.db.any(
      'SELECT c.github_repo, l.execution_num, l.log_text, l.log_error FROM logs l JOIN components c on l.component_id = c.component_id JOIN users u on c.user_id = u.user_id JOIN workers w on l.worker_id = w.worker_id WHERE u.github_username = $1 AND c.github_repo = $2 ORDER BY l.received_time;',
      [username, componentName])
    .then((data) => data);
  }

  createNewUser(username, email) {
    console.log(username);
    console.log(email);
    this.db.oneOrNone(
      'INSERT INTO v9.public.users (email, github_username) SELECT $1, $2 WHERE NOT EXISTS ( SELECT github_username FROM v9.public.users WHERE github_username = $2)',
      [email, username])
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log('ERROR WITH DB INSERTION');
      console.log(error);
    });
  }
}

export default Database;
