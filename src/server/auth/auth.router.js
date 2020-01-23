const express = require('express');

const passport = require('passport');

const authController = require('./auth.controller');

const router = express.Router();
const githubAuth = passport.authenticate('github');

router.get('/github/callback', githubAuth, authController.github);

router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/github', githubAuth);

router.get('/validateAuth', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'User is currently authenticated',
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://v9_website.ngrok.io');
})

module.exports = router;
