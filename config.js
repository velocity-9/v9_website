// Back-end URL for the client socket
exports.API_URL = 'http://localhost:8080';

// Back-end URL used by the server
// In dev mode, it should be the same as the front end, but could be different for production
exports.BACKEND_BASE_URL = 'http://v9_website.ngrok.io';

exports.FRONTEND_BASE_URL = 'http://v9_website.ngrok.io';

const providers = ['github'];
const callbacks = providers.map(provider => `${exports.BACKEND_BASE_URL}/api/auth/${provider}/callback`);
const [githubURL] = callbacks;

exports.CLIENT_ORIGIN = [exports.FRONTEND_BASE_URL];

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
};
