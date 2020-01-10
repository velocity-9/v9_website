const express = require('express');

const router = express.Router();
const passport = require('passport');
const authController = require('./auth.controller');

const githubAuth = passport.authenticate('github');

router.get('/github/callback', githubAuth, authController.github);

router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/github', githubAuth);

module.exports = router;
