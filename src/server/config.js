const providers = ['github'];

const callbacks = providers.map(provider => `http://localhost:8080/api/auth/${provider}/callback`);

const [githubURL] = callbacks;

exports.CLIENT_ORIGIN = ['http://127.0.0.1:3000', 'http://localhost:3000'];

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
};
