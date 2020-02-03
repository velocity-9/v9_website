import 'dotenv/config';
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';

class Authentication {
  constructor(database) {
    this.passport = passport;
    this.database = database;
    this.githubConfig = {
      clientID: process.env.GITHUB_KEY,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://v9_website.ngrok.io/api/auth/github/callback'
    };
  }

  initialize() {
    this.passport.use(new GithubStrategy(this.githubConfig, this.githubCallback));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  }

  getPassport() {
    return this.passport;
  }

  githubCallback(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }

  serializeUser(user, done) {
    done(null, user);
  }

  deserializeUser(obj, done) {
    done(null, obj);
  }
}

export default Authentication;
