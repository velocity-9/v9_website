const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const { GITHUB_CONFIG } = require('../../../config');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => done(null, obj));
  const callback = (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  };

  passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
};
