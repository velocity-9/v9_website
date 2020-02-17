// @flow

import 'dotenv/config';
import pgp from 'pg-promise';

class Database {
  // This is "any" because pg-promise doesn't have anything in flow-typed
  db: any;

  constructor() {
    const connection = {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
    };
    this.db = pgp()(connection);
  }

  getUserComponents(username: string) {
    const query = `SELECT users.github_username, components.github_repo FROM users, components
                   WHERE users.user_id = components.user_id AND users.github_username=$1`;
    return this.db.any(query, username);
  }

  getComponentStatus(username: string, componentName: string) {
    const query = `SELECT c.github_repo, s.received_time, s.color, s.stat_window_seconds, s.hits, 
                   s.avg_response_bytes, s.avg_ms_latency, w.worker_name FROM stats s
                   JOIN components c on s.component_id = c.component_id JOIN users u on 
                   c.user_id = u.user_id JOIN workers w on s.worker_id = w.worker_id WHERE 
                   u.github_username = $1 AND c.github_repo = $2 ORDER BY s.received_time DESC LIMIT 100;`;
    return this.db.any(query, [username, componentName]);
  }

  getComponentLogs(username: string, componentName: string) {
    const query = `SELECT c.github_repo, l.execution_num, l.log_text, l.log_error FROM logs l JOIN 
                   components c on l.component_id = c.component_id JOIN users u on 
                   c.user_id = u.user_id JOIN workers w on l.worker_id = w.worker_id WHERE 
                   u.github_username = $1 AND c.github_repo = $2 ORDER BY l.received_time DESC;`;
    return this.db.any(query, [username, componentName]);
  }

  createNewUser(username: string, email: string) {
    const query = `INSERT INTO v9.public.users (email, github_username) SELECT $1, $2 WHERE NOT 
                   EXISTS ( SELECT github_username FROM v9.public.users WHERE github_username = $2)`;
    return this.db.oneOrNone(query, [email, username]);
  }
}

export default Database;
