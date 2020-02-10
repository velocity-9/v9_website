import express from 'express';

class DatabaseRouter {
  constructor(database) {
    this.router = express.Router();
    this.database = database;
    this.router.get('/getUserFunctions', (req, res) => this.getUserComponentsRequest(req, res));
    this.router.get('/getComponentStatus', (req, res) => this.getComponentStatusRequest(req, res));
    this.router.get('/getComponentLogs', (req, res) => this.getComponentLogsRequest(req, res));
  }

  getUserComponentsRequest(req, res) {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getUserComponents(req.user.username)
      .then((value) => {
        res.json(value);
      });
  }

  getComponentStatusRequest(req, res) {
    const componentName = req.query.component;
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    this.database.getComponentStatus(req.user.username, componentName)
      .then((data) => {
        res.json(data);
      });
  }

  getComponentLogsRequest(req, res) {
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
