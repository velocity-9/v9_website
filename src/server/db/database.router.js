// @flow

import * as express from 'express';

import Database from './database';

class DatabaseRouter {
  router: express.Router<>;
  database: Database;

  constructor(database: Database) {
    this.router = express.Router();
    this.database = database;
    this.router.get('/getUserComponents', (req, res) => this.getUserComponentsRequest(req, res));
    this.router.get('/getComponentStats', (req, res) => this.getComponentStatsRequest(req, res));
    this.router.get('/getComponentLogs', (req, res) => this.getComponentLogsRequest(req, res));
  }

  getUserComponentsRequest(req: express.$Request, res: express.$Response) {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getUserComponents(req.user.username)
      .then((value) => {
        res.json(value);
      });
  }

  getComponentStatsRequest(req: express.$Request, res: express.$Response) {
    const componentName = req.query.component;
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getComponentStats(req.user.username, componentName)
      .then((data) => {
        res.json(data);
      });
  }

  getComponentLogsRequest(req: express.$Request, res: express.$Response) {
    const componentName = req.query.component;

    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getComponentLogs(req.user.username, componentName)
      .then((data) => {
        res.json(data);
      });
  }

  getRouter() {
    return this.router;
  }
}

export default DatabaseRouter;
