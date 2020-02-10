import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import session from 'express-session';

class App {
  constructor(config) {
    this.port = config.port;
    this.express = express();
    this.server = http.createServer(this.express);
    this.configureMiddleware();

    const checkVar = (input, message) => {
      if (!input) {
        throw new TypeError(message);
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

  registerPassport(auth) {
    this.express.use(auth.initializePassport());
    this.express.use(auth.passportSession());
  }

  configureMiddleware() {
    const expressApp = this.express;
    // Static pages are loaded from the 'dist' directory
    expressApp.use(express.static('dist'));
    // Log level dev
    expressApp.use(logger('dev'));
    // Allow for parsing JSON requests middleware
    expressApp.use(express.json());
    // Cookie settings
    expressApp.use(cookieSession({
      name: 'session',
      keys: [process.env.COOKIE_SECRET],
      maxAge: 24 * 60 * 60 * 1000
    }));
    // Parse cookies
    expressApp.use(cookieParser());
    // Session storage settings
    expressApp.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }));
  }

  registerRouter(url, router) {
    this.express.use(url, router);
  }
}

export default App;
