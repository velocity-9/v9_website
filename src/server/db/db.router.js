const express = require('express');
const passport = require('passport');

const router = express.Router();

const dbController = require('./db.controller');

router.get('/getUserFunctions', dbController.getUserFunctionsRequest);
router.get('/getComponentStatus', dbController.getComponentStatusRequest);
router.get('/getComponentLogs', dbController.getComponentLogsRequest);

module.exports = router;
