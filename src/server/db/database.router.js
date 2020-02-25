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
    this.router.get('/getComponentDashboardInfo', (req, res) => this.getComponentDashboardInfoRequest(req, res));
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

  async getComponentDashboardInfoRequest(req: express.$Request, res: express.$Response) {
    const componentName = req.query.component;
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const username = req.user.username;
    const dashboardInfo = await this.database.getComponentDashboardInfo(username, componentName);
    const deploying = await this.database.getComponentDeployingStatus(username, componentName);
    const result = {
      deploymentIntention: dashboardInfo.deployment_intention,
      receivedTime: dashboardInfo.received_time,
      color: dashboardInfo.color,
      isDeploying: deploying != null,
      deploymentReason: deploying != null ? deploying.deployment_reason : ''
    };

    res.json(result);
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
