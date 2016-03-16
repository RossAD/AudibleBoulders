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
var users = require('./request-handlers/users.js');

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

// Configure Passport
passport.use(new GithubStrategy({
  clientID: keys.github.id,
  clientSecret: keys.github.secret,
  callbackUrl: 'http://localhost:8080/login/github_callback'
},
function (accessToken, refreshToken, profile, done) {
  // TODO: DB query to create profile id, change to access DB
  process.nextTick(function () {
    users.postUser(profile._json);
    return done(null, profile._json);
  });
}));

// GITHUB LOGIN
app.get('/login/github',
  passport.authenticate('github', {scope: ['user:email']}));

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



var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});