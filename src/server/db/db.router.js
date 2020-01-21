const express = require('express');
const passport = require('passport');

const router = express.Router();

const dbController = require('./db.controller');

router.get('/getUserFunctions', dbController.getUserFunctions);
router.get('/getComponentStatus', dbController.getComponentStatus);
router.get('/getComponentLogs', dbController.getComponentLogs);

module.exports = router;
