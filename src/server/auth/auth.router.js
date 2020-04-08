// @flow

import express from 'express';
import type { Router, $Request, $Response } from 'express';

import Authentication from 'server/auth/auth';
import Database from 'server/db/database';

export default class AuthRouter {
  router: Router<>;

  auth: Authentication;

  database: Database;

  constructor(auth: Authentication, database: Database) {
    this.router = express.Router();
    this.auth = auth;
    this.database = database;

    const validateAuthCallback = (req: $Request, res: $Response) => {
      if (req.user) {
        res.json({
          success: true,
          message: 'User is currently authenticated',
          user: req.user,
          cookies: req.cookies
        });
      }
    };

    const logoutCallback = (req: $Request, res: $Response) => {
      req.logout();
      res.redirect('http://v9_website.ngrok.io');
    };

    this.router.get('/github/callback', this.auth.authenticate('github'), (req, res) => this.onLoginSuccessCallback(req, res));
    this.router.get('/github', this.auth.authenticate('github'));
    this.router.get('/validateAuth', validateAuthCallback);
    this.router.get('/logout', logoutCallback);
  }

  onLoginSuccessCallback(req: $Request, res: $Response) {
    const user = {
      name: req.user.username,
      photo: req.user.photos[0].value
    };

    req.session.user = user.name;
    this.database.createNewUser(req.user.username, 'test@test.com');
    console.log(req);
    if (!('cookies' in req)) {
      console.log('Null object was found!');
      res.redirect('http://v9_website.ngrok.io');
    } else {
      res.cookie(req.cookies).redirect('http://v9_website.ngrok.io');
    }
  }

  getRouter() {
    return this.router;
  }
}
