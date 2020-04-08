// @flow

import * as express from 'express';
import _ from 'underscore';

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
    const userComponents = await this.database.getUserComponents(username);
    if (userComponents.length === 0) {
      res.json([]);
      return;
    }

    const userId = userComponents[0].user_id;

    const componentColorInfo = await this.database.getComponentColors(userId);
    const componentDeployingInfo = await this.database.getComponentsDeployingStatus(userId);
    const runningComponents = await this.database.getRunningComponents(userId);

    const deployedComponents = _.filter(userComponents, (item) => item.deployment_intention !== 'not_a_component');
    const notDeployedComponents = _.filter(userComponents, (item) => item.deployment_intention === 'not_a_component');
    const notDeployedComponentStrings = _.map(notDeployedComponents, (item) => item.github_repo);

    const fullyDeployedComponentsInfo = [];
    for (let i = 0; i < deployedComponents.length; i += 1) {
      const componentId = deployedComponents[i].component_id;
      const componentColorEntry = _.findWhere(componentColorInfo, { component_id: componentId });
      const componentColor = componentColorEntry !== undefined ? componentColorEntry.color : 'grey';
      const isDeploying = _.findWhere(
        componentDeployingInfo,
        { component_id: componentId }
      ) !== undefined;
      const isRunning = _.findWhere(runningComponents, { component_id: componentId }) !== undefined;

      fullyDeployedComponentsInfo.push({
        username,
        componentName: deployedComponents[i].github_repo,
        deploymentIntention: deployedComponents[i].deployment_intention,
        color: componentColor,
        isDeploying,
        isRunning
      });
    }

    res.json({
      components: fullyDeployedComponentsInfo,
      notComponents: notDeployedComponentStrings
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
