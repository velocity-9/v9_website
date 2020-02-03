import express from 'express';

export default class AuthRouter {
  constructor(auth, database) {
    this.router = express.Router();
    this.auth = auth;
    this.database = database;

    const validateAuthCallback = (req, res) => {
      if (req.user) {
        res.json({
          success: true,
          message: 'User is currently authenticated',
          user: req.user,
          cookies: req.cookies
        });
      }
    };

    const logoutCallback = (req, res) => {
      req.logout();
      res.redirect('http://v9_website.ngrok.io');
    };

    this.router.get('/github/callback', this.auth.getPassport().authenticate('github'), (req, res) => this.onLoginSuccessCallback(req, res));
    this.router.get('/github', this.auth.getPassport().authenticate('github'));
    this.router.get('/validateAuth', validateAuthCallback);
    this.router.get('/logout', logoutCallback);
  }

  onLoginSuccessCallback(req, res) {
    const user = {
      name: req.user.username,
      photo: req.user.photos[0].value
    };

    req.session.user = user.name;
    this.database.createNewUser(req.user.username, 'test@test.com');
    res.cookie(req.cookies)
      .redirect('http://v9_website.ngrok.io');
  }

  getRouter() {
    return this.router;
  }
}
