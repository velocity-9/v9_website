const express = require('express');

const router = express.Router();
const passport = require('passport');
const authController = require('./auth.controller');

const githubAuth = passport.authenticate('github');
const testFunc = () => console.log('TESTING');

router.get('/api/auth/github/callback', githubAuth, authController.github);

router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/api/auth/github', githubAuth);

module.exports = router;
