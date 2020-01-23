const dbConnection = require('./db.connection');

module.exports.getUserFunctionsRequest = (req, res) => {
  if (!req.user) {
    console.log('Trying to make call not authorized');
    res.sendStatus(401);
  }

  dbConnection.getUserFunctions(req.user.username)
  .then(data => {
    if (data === undefined) {
      res.json({error: 'No components exist'});
    } else {
      res.json(data);
    }
  });
};

module.exports.getComponentStatusRequest = (req, res) => {
  const componentName = req.query.component;
  if (!req.user) {
    res.sendStatus(401);
  }

  dbConnection.getComponentStatus(req.user.username, componentName)
  .then(data => {
    console.log(data);
    res.json(data);
  });
};

module.exports.getComponentLogsRequest = (req, res) => {
  const componentName = req.query.component;

  if (!req.user) {
    res.sendStatus(401);
  }

  dbConnection.getComponentLogs(req.user.username, componentName)
  .then(data => {
    res.json(data);
  });
};
