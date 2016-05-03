"use strict";

var PORT = process.env.PORT || 8080;

/** Github Auth and Sessions **/
var keys = require('./keys.js');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var GithubStrategy = require('passport-github2').Strategy;
var session = require('express-session');

/** Query files **/
var User = require('../queries/users');

module.exports = function (app) {

  app.use(cookieparser());

  app.use(session({
    secret:'audibleBoulder',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

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
      User.updateOrCreate(profile._json, accessToken, function (err, result) {
        if (err) throw new Error(err);
      });
      return done(null, profile._json);
    });
  }));

  // GITHUB LOGIN
  app.get('/login/github',
    passport.authenticate('github', {scope: ['user:email','read:org', 'repo']}));

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
};
