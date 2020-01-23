/*
This acts as the "controller" to parse the login data from Github, and parse it into something
for the client.
 */
const dbConnection = require('../db/db.connection');

exports.github = (req, res) => {
  // Get the login data from the request
  const io = req.app.get('io');

  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value
  };

  req.session.user = user.name;

  // This puts the user data in the socket so that the client can access it
  io.in(req.session.socketId).emit('github', user);
  dbConnection.createNewUser(req.user.username, 'test@test.com');

  res.cookie(req.cookies).redirect('http://v9_website.ngrok.io');
};
