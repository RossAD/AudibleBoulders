/*jshint loopfunc: true */
"use strict";

/** Create Server and Set Port **/
var PORT = process.env.PORT || 8080; // Set port
var express = require('express');
var app = express();

/** Create DB Connection and Require User Queries**/
var db = module.parent ?
  require('./db').createPool('test', PORT) : require('./db').createPool('app', PORT);
var users = require('./queries/users.js');

/** Github Auth and Sessions **/
var keys = require('./config/keys.js');
var passport = require('passport');
var cookieparser = require('cookie-parser');
var GithubStrategy = require('passport-github2').Strategy;
var session = require('express-session');

/** Socket Dependencies **/
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = {
    PORT: PORT,
    io: io
};


/** Query files **/
var User = require('./queries/users');
var Diff = require('./queries/diffs');
var Github = require('./queries/github');
var Dashboard = require('./queries/dashboards');
var UserDashboard = require('./queries/users_dashboards');

io.on('connect', function (socket) {
  module.exports.socket = socket;
  console.log('Sockets connected!');
  socket.on('disconnect', function () {
    console.log('Sockets disconnected');
  });

  socket.on('newJoin', function (data) {
    var userObject = {};
    var dashboardId;
    console.log('got to the newJoin socket in server js with data: ', data);
    var githubId = data.githubId;
    console.log('got the githubId: ', githubId);
    User.getOneAsync(githubId)
      .then(function (user) {
        userObject.github_id = user.github_id;
        userObject.github_handle = user.github_handle;
        userObject.github_name = user.github_name;
        userObject.github_avatar = user.github_avatar;
        console.log('checking....', data.name, data.owner.login);
        return Dashboard.getOneAsync(data.name, data.owner.login);
        })
      .then(function (dashboard) {
        dashboardId = dashboard.id;
        console.log('joining the channel: ', dashboardId);
        socket.join(dashboardId);
        console.log('dashboard i: ', dashboardId, githubId);
        return UserDashboard.getOneAsync(githubId, dashboardId);
      })
      .then(function (userdashboard) {
        console.log('got the userdashboard back: ', userdashboard);
        userObject.set_up = userdashboard.set_up;
        userObject.last_pulled_commit_msg = userdashboard.last_pulled_commit_msg;
        userObject.last_pulled_commit_sha1 = userdashboard.last_pulled_commit_sha1;
        var signatureHash = userdashboard.signature_hash;
        return Diff.getAllAsync(signatureHash);
      })
      .then(function (diff) {
        console.log('got the diff back: ', diff);
        userObject.diffs = diff;
        console.log('about to emit to channel: ', dashboardId);
        console.log('io sockets at this point: ', io.sockets);
        io.sockets.to(dashboardId).emit('newUser', userObject);
      });
  });

  socket.on('removeDash', function (data) {
    var dashboardId = data.dashboardId;
    socket.join(dashboardId);
    io.sockets.to(dashboardId).emit('removeUser', data);
  });
});

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
    users.updateOrCreate(profile._json, accessToken, function (err, result) {
      if (err) throw new Error(err);
    });
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




http.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});