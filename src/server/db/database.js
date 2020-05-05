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
    const query = `SELECT c.user_id, c.component_id, c.github_repo, c.deployment_intention 
                   FROM components c JOIN users u on c.user_id = u.user_id 
                   WHERE u.github_username = $1;`;
    return this.db.any(query, username);
  }

  getComponentColors(userId: string) {
    const query = `SELECT s.component_id, s.color FROM stats s JOIN
                   components c on s.component_id = c.component_id WHERE
                   (s.component_id, s.received_time) IN (
                   SELECT component_id, MAX(received_time) FROM stats GROUP BY component_id)
                   AND c.user_id = $1;`;

    return this.db.any(query, userId);
  }

  getComponentsDeployingStatus(userId: string) {
    const query = `SELECT d.component_id, d.deployment_start_time, d.deployment_reason 
                   FROM deploying d JOIN components c on d.component_id = c.component_id 
                   WHERE c.user_id = $1;`;
    return this.db.any(query, userId);
  }

  getRunningComponents(userId: string) {
    const query = `SELECT currently_running.component_id FROM currently_running 
                   JOIN components c on currently_running.component_id = c.component_id
                   WHERE c.user_id = $1;`;
    return this.db.any(query, userId);
  }

  getComponentStats(username: string, componentName: string) {
    const query = `SELECT c.github_repo, s.received_time, s.color, s.stat_window_seconds, s.hits,
                   s.avg_response_bytes, s.avg_ms_latency, w.worker_name FROM stats s
                   JOIN components c on s.component_id = c.component_id JOIN users u on
                   c.user_id = u.user_id JOIN workers w on s.worker_id = w.worker_id WHERE
                   u.github_username = $1 AND c.github_repo = $2 ORDER BY s.received_time DESC;`;
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

  getStatsInMinutesRange(username: string, componentName: string,
    startRange: number, endRange: number) {
    const query = `SELECT c.github_repo, s.received_time, s.stat_window_seconds, s.hits,
       s.avg_response_bytes, s.avg_ms_latency, w.worker_name FROM stats s JOIN components c 
       on s.component_id = c.component_id JOIN users u on c.user_id = u.user_id JOIN workers w
       on s.worker_id = w.worker_id WHERE u.github_username = $1 AND c.github_repo = $2
       AND s.received_time between (now() - interval $3) and (now() - interval $4) 
       ORDER BY s.received_time DESC LIMIT 1;`;

    const startRangeString = `${startRange.toString()} minutes`;
    const endRangeString = `${endRange.toString()} minutes`;

    return this.db.oneOrNone(query, [username, componentName, endRangeString, startRangeString]);
  }
}

export default Database;
