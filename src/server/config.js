const providers = ['github'];

const callbacks = providers.map(provider => `http://v9_website.ngrok.io/api/auth/${provider}/callback`);

const [githubURL] = callbacks;

exports.CLIENT_ORIGIN = ['http://v9_website.ngrok.io', 'http://v9_website.ngrok.io'];

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
};
