const express = require('express');
const router = express.Router();

const routerFunc = () => {
  console.log('made it to the route!');
};

router.get('/test', (req, res) => {
  res.send('Testing!');
  console.log('Did this work?');
});

module.exports = router;
