var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var bodyparser = require('body-parser');
var keys = require('./config/keys.js');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var githubstrategy = require('passport-github2').Strategy;
var session = require('express-session');
var db = require('./db');

app.use(cookieparser());
app.use(session({
  secret:'audibleBoulder',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Temp object for testing GITHUB login
var users = {};

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  if (users[userId]) {
    done(null, users[userId]);
  } else {
    done('user not found', null);
  }
});

// Configure Passport
passport.use(new githubstrategy({
  clientID: keys.github.id,
  clientSecret: keys.github.secret,
  // URL to redirect to on login
  callbackUrl: 'https://www.getpostman.com/oauth2/callback'
},
function (accessToken, refreshToken, profile, done) {
  // DB query to create profile id, change to access DB
  console.log("Success?!?!??!?!?!?!");
  users[profile.id] = profile;
  done(null, users[profile.id]);
}));

// GITHUB LOGIN
app.get('/login/github', passport.authenticate('github'));

app.get('/login/github_callback', passport.authenticate('github', {
  successRedirect: '/github/profile',
  failureRedirect: '/github/failure'
}));

app.get('/github/profile', checkPermission, function (req, res) {
  res.send("Success!!!!!!!!!!!");
});

app.get('/github/failure', function (req, res) {
  res.send("Authentication failed.");
});

function checkPermission (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/github/failure');
  }
}


var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});