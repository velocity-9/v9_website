// @flow

import 'dotenv/config';
import http from 'http';
import type { Server } from 'http';

import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import type { $Application, Router } from 'express';
import session from 'express-session';
import logger from 'morgan';


import Authentication from './auth/auth';

class App {
  port: number;

  express: $Application<>;

  server: Server;


  constructor(config: AppConfig) {
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
    checkVar(process.env.POSTGRES_HOST, 'Missing env POSTGRES_HOST');
    checkVar(process.env.POSTGRES_PORT, 'Missing env POSTGRES_PORT');
    checkVar(process.env.POSTGRES_DB, 'Missing env POSTGRES_DB');
    checkVar(process.env.POSTGRES_USERNAME, 'Missing env POSTGRES_USERNAME');
    checkVar(process.env.POSTGRES_PASSWORD, 'MISSING env POSTGRES_PASSWORD');
    checkVar(process.env.COOKIE_SECRET, 'Missing env COOKIE_SECRET');
  }

  start() {
    this.server.listen(process.env.PORT || 8080,
      () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
  }

  registerPassport(auth: Authentication) {
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

  registerRouter(url: string, router: Router<>) {
    this.express.use(url, router);
  }
}

export default App;
