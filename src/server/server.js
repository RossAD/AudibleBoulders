"use strict";
var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
var keys = require('./config/keys.js');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var GithubStrategy = require('passport-github2').Strategy;
var session = require('express-session');
var db = require('./db');
var users = require('./users.js');

app.use(cookieparser());
app.use(session({
  secret:'audibleBoulder',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Temp object for testing GITHUB login
// var users = {};

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

// Test route
// app.get('/', function(req, res, next){
//   res.json("You Made It!!!!!!!!!!!!!!!!!!!!!!", res);
// });
// Configure Passport
passport.use(new GithubStrategy({
  clientID: keys.github.id,
  clientSecret: keys.github.secret,
  // URL to redirect to on login
  callbackUrl: 'http://localhost:8080/login/github_callback',
  userAgent: 'localhost:8080'
},
function (accessToken, refreshToken, profile, done) {
  // DB query to create profile id, change to access DB
  process.nextTick(function () {
    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.

    return done(null, users.postUser());
  });
  // users[profile.id] = profile;
  // done(null, users[profile.id]);
}));

// GITHUB LOGIN
app.get('/login/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/login/github_callback', passport.authenticate('github', {
  failureRedirect: 'https://www.amazon.com'
}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/', res.body);
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



var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});