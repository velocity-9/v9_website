function checkVar(input, message) {
  if (!input) {
    throw new Error(message);
  }
}

module.exports = () => {
  checkVar(process.env.GITHUB_KEY, 'Missing env variable GITHUB_KEY!');
  checkVar(process.env.GITHUB_SECRET, 'Missing env variable GITHUB_SECRET!');
  checkVar(process.env.SESSION_SECRET, 'Missing env variable SESSION_SECRET!');
  checkVar(process.env.HOST, 'Missing env variable HOST!');
};
