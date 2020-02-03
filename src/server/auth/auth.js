import 'dotenv/config';
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';

class Authentication {
  constructor() {
    this.passport = passport;
    this.githubConfig = {
      clientID: process.env.GITHUB_KEY,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://v9_website.ngrok.io/api/auth/github/callback'
    };
  }

  initialize() {
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

  getPassport() {
    return this.passport;
  }
}

export default Authentication;