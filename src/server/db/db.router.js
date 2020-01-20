const express = require('express');

const router = express.Router();

const dbController = require('./db.controller');

const getFunctionStatus = (req, res) => {
  res.json([{ status: 'doing great' }]);
};

router.get('/getUserFunctions', dbController.getUserFunctions);
router.get('/getFunctionStatus', getFunctionStatus);

module.exports = router;
