import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import http from 'http';
import passport from 'passport';
import logger from 'morgan';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

class App {
  constructor(config) {
    this.port = config.port;
    this.express = express();
    this.server = http.createServer(this.express);
    this.configureMiddleware();

    const checkVar = (input, message) => {
      if (!input) {
        throw new Error(message);
      }
    };

    checkVar(process.env.GITHUB_KEY, 'Missing env variable GITHUB_KEY!');
    checkVar(process.env.GITHUB_SECRET, 'Missing env variable GITHUB_SECRET!');
    checkVar(process.env.SESSION_SECRET, 'Missing env variable SESSION_SECRET!');
    checkVar(process.env.HOST, 'Missing env variable HOST!');
    checkVar(process.env.POSTGRES_USERNAME, 'Missing env POSTGRES_USERNAME');
    checkVar(process.env.POSTGRES_PASSWORD, 'MISSING env POSTGRES_PASSWORD');
  }

  start() {
    this.server.listen(process.env.PORT || 8080,
      () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
  }

  registerPassport(passportAuth) {
    this.express.use(passportAuth.initialize());
    this.express.use(passportAuth.session());
  }

  configureMiddleware() {
    const expressApp = this.express;
    expressApp.use(express.static('dist'));
    expressApp.use(logger('dev'));
    expressApp.use(express.json());
    expressApp.use(cookieSession({
      name: 'session',
      keys: [process.env.COOKIE_SECRET],
      maxAge: 24 * 60 * 60 * 1000
    }));
    expressApp.use(cookieParser());
    expressApp.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
  }

  registerRouter(url, router) {
    this.express.use(url, router);
  }
}

export default App;
