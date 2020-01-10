module.exports = () => {
  if (!process.env.GITHUB_KEY) {
    throw new Error('Missing env variable GITHUB_KEY!');
  }

  if (!process.env.GITHUB_SECRET) {
    throw new Error('Missing env variable GITHUB_SECRET!');
  }

  if (!process.env.SESSION_SECRET) {
    throw new Error('Missing env variable SESSION_SECRET!');
  }

  if (!process.env.HOST) {
    throw new Error('Missing env variable HOST');
  }
};
