require('dotenv').config();
const express = require('express');
const session = require('express-session');
const http = require('http');
const passport = require('passport');
const socketio = require('socket.io');
const logger = require('morgan');
const authRouter = require('./util/auth/auth.router');
const passportInit = require('./util/auth/passport.init');
const verifyEnv = require('./util/verify_env');

// Initialize express app
const app = express();
// Create HTTP server, this will eventually be https
const server = http.createServer(app);

// Check for required env variables
verifyEnv();

app.use(logger('dev'));
app.use(express.static('dist'));

// Allow for parsing JSON
app.use(express.json());

app.use(passport.initialize());
passportInit();

// Used to store session data
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

const io = socketio(server);
app.set('io', io);

// Register the authentication router
app.use('/api/auth', authRouter);

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
