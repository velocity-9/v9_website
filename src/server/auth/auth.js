// @flow

import 'dotenv/config';
import passport from 'passport';

import { Strategy as GithubStrategy } from 'passport-github';

import type { Strategy } from 'passport';

type GithubConfig = {
  clientID: string,
  clientSecret: string,
  callbackURL: string
};

class Authentication {
  passport: passport;
  githubConfig: GithubConfig;

  constructor() {
    this.passport = passport;
    if (process.env.GITHUB_KEY == null || process.env.GITHUB_SECRET == null) {
      throw new Error('GITHUB_KEY or GITHUB_SECRET is not set');
    }

    this.githubConfig = {
      clientID: process.env.GITHUB_KEY,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://v9_website.ngrok.io/api/auth/github/callback'
    };

    const githubCallback = (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    };

    const serializeUser = (user, done) => {
      done(null, user);
    };

    const deserializeUser = (obj, done) => {
      done(null, obj);
    };

    this.passport.use(new GithubStrategy(this.githubConfig, githubCallback));
    this.passport.serializeUser(serializeUser);
    this.passport.deserializeUser(deserializeUser);
  }

  initializePassport() {
    return this.passport.initialize();
  }

  passportSession() {
    return this.passport.session();
  }

  authenticate(strategy: Strategy) {
    return this.passport.authenticate(strategy);
  }
}

export default Authentication;
