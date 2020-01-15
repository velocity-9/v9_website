/*
This acts as the "controller" to parse the login data from Github, and parse it into something
for the client.
 */

exports.github = (req, res) => {
  // Get the login data from the request
  const io = req.app.get('io');

  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value
  };

  // This puts the user data in the socket so that the client can access it
  io.in(req.session.socketId).emit('github', user);
  res.end();
};
