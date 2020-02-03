import express from 'express';

class AuthRouter {
  constructor(auth, database) {
    this.router = express.Router();
    this.auth = auth;
    this.database = database;

    this.router.get('/github/callback',
      this.auth.getPassport()
      .authenticate('github'),
      (req, res) => this.onLoginSuccess(req, res));
    this.router.get('/github',
      this.auth.getPassport()
      .authenticate('github'));
    this.router.get('/validateAuth', this.validateAuth);
    this.router.get('/logout', this.logout);
  }

  onLoginSuccess(req, res) {
    console.log(req);
    const user = {
      name: req.user.username,
      photo: req.user.photos[0].value
    };

    req.session.user = user.name;
    this.database.createNewUser(req.user.username, 'test@test.com');
    res.cookie(req.cookies)
    .redirect('http://v9_website.ngrok.io');
  }

  validateAuth(req, res) {
    if (req.user) {
      res.json({
        success: true,
        message: 'User is currently authenticated',
        user: req.user,
        cookies: req.cookies
      });
    }
  }

  logout(req, res) {
    req.logout();
    res.redirect('http://v9_website.ngrok.io');
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRouter;

// const express = require('express');
//
// const passport = require('passport');
//
// const authController = require('./auth.controller');
//
// const router = express.Router();
// const githubAuth = passport.authenticate('github');
//
// router.get('/github/callback', githubAuth, authController.github);
//
// router.use((req, res, next) => {
//   req.session.socketId = req.query.socketId;
//   next();
// });
//
// router.get('/github', githubAuth);
//
// router.get('/validateAuth', (req, res) => {
//   if (req.user) {
//     res.json({
//       success: true,
//       message: 'User is currently authenticated',
//       user: req.user,
//       cookies: req.cookies
//     });
//   }
// });
//
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('http://v9_website.ngrok.io');
// })
//
// module.exports = router;
