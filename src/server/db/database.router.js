// @flow

import * as express from 'express';

import Database from 'server/db/database';

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

  async getUserComponentsRequest(req: express.$Request, res: express.$Response) {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const username = req.user.username;

    // part 1: get user components
    const userComponentInfo = await this.database.getUserComponents(username);

    const colorPromises = userComponentInfo.map(
      (component) => this.database.getComponentColor(username, component.github_repo)
    );
    const deployingPromises = userComponentInfo.map(
      (component) => this.database.getComponentDeployingStatus(username, component.github_repo)
    );

    const colorResults = await Promise.all(colorPromises);
    const deployingResults = await Promise.all(deployingPromises);

    const results = [];
    for (let i = 0; i < userComponentInfo.length; i += 1) {
      const isDeploying = deployingResults[i] != null;
      const color = colorResults[i] != null ? 'grey' : colorResults[i];

      results.push({
        username: userComponentInfo[i].github_username,
        componentName: userComponentInfo[i].github_repo,
        deploymentIntention: userComponentInfo[i].deployment_intention,
        color,
        isDeploying
      });
    }

    res.json(results);
  }

  getComponentStatsRequest(req: express.$Request, res: express.$Response) {
    const componentName = req.query.component;
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getComponentStats(req.user.username, componentName)
      .then((data) => {
        console.log(data);
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
