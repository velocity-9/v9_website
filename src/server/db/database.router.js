// @flow

import * as express from 'express';
import fetch from 'node-fetch';

import Database from 'server/db/database';

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
    this.router.post('/sendDeploymentIntention', (req, res) => this.sendDeploymentIntentionRequest(req, res));
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
      deploymentReason: deploying != null ? deploying.deployment_reason : null
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

  // eslint-disable-next-line class-methods-use-this
  async sendDeploymentIntentionRequest(req: express.$Request, res: express.$Response) {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const url = 'http://v9_dep_mgr.patcody.io:81/api/set_deployment_intention';
    const body = {
      id: {
        user: req.user.username,
        repo: req.body.componentName
      },
      new_deployment_intention: req.body.deploymentIntention
    };

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.log('Did not successfully update component deployment intention');
    }

    res.sendStatus(200);
  }

  getRouter() {
    return this.router;
  }
}

export default DatabaseRouter;
