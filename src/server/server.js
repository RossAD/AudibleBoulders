/*jshint loopfunc: true */
"use strict";

/** Create Server and Set Port **/
var PORT = module.exports = process.env.PORT || 8080; // Set port
var express = require('express');
var app = express();

/** Create DB Connection and Require User Queries**/
var db = module.parent ?
  require('./db').createPool('test', PORT) : require('./db').createPool('app', PORT);
var users = require('./new-request-handlers/users.js');

/** Github Auth and Sessions **/
var keys = require('./config/keys.js');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var GithubStrategy = require('passport-github2').Strategy;
var session = require('express-session');

/** Socket Dependencies **/
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cookieparser());

app.use(session({
  secret:'audibleBoulder',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (userId, done) {
  if (userId) {
    done(null,userId);
  } else {
    done('user not found', null);
  }
});
function token (token) {
  console.log('This is Your Token: ', token);
}
// Configure Passport
var callbackHost = (PORT === 8080) ? 'localhost:8080' : 'www.gitspy.com';

passport.use(new GithubStrategy({
  clientID: keys.github.id,
  clientSecret: keys.github.secret,
  callbackUrl: 'http://' + callbackHost + '/login/github_callback'
},
function (accessToken, refreshToken, profile, done) {
  // TODO: DB query to create profile id, change to access DB
  process.nextTick(function () {
    token(accessToken);
    users.postUser(profile._json, accessToken);
    return done(null, profile._json);
  });
}));

// GITHUB LOGIN
app.get('/login/github',
  passport.authenticate('github', {scope: ['user:email','read:org', 'public_repo']}));

app.get('/login/github_callback',
  passport.authenticate('github', {failureRedirect: '/'}),
  function(req, res) {
    // Successful authentication, create cookie, redirect home.
    res.cookie('githubId', req.user.id);
    res.cookie('githubName', req.user.login);
    res.redirect('/');
  });

function checkPermission (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/github/failure');
  }
}

app.get('/github/profile', checkPermission, function (req, res) {
  res.send(req.user);
});

app.get('/github/failure', function (req, res) {
  res.send("Authentication failed.");
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

io.on('connect', function (socket) {
  console.log('Sockets connected!');
  socket.on('disconnect', function () {
    console.log('Sockets disconnected');
  });

  socket.on('newJoin', function (data) {
    socket.join(data.dashboards_id);
  });
});

http.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});