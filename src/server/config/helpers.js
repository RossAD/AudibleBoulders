/*jslint node: true */
"use strict";

// var jwt = require('jwt-simple');
var db = require('../db');

var createUsersProjectsEntry = function() {
  console.log('createUsersProjectsEntry called');
};

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  // Dummy function to test routes
  testy: function (req, res, next) {
    res.json("Route Succesful");
  },

  handleCommit: function (req, res, next) {
    var users_id = req.body.users_id;
    var projects_id = req.body.projects_id;
    var last_pulled_commit = req.body.last_pulled_commit;
    var diffs = req.body.diffs;
    console.log("got req.body.users_id:", req.body.users_id);
    console.log("got req.body.projects_id:", req.body.projects_id);
    console.log("got req.body.last_pulled_commit:", req.body.last_pulled_commit);
    console.log("got req.body.diffs:", req.body.diffs);
    res.json("You made a POST to /api/commits/");

    // 1) find or create an entry in users_projects table, return its record id
    // 2) delete all entries from diffs table where users_projects_id matches above
    // 3) iterate through req.body.diffs, make a new entry in diffs table for each

    var queryStr = "SELECT id FROM users_projects WHERE users_id='" + users_id.toString() + "' AND projects_id='" + projects_id.toString() + "'";
    console.log("queryStr:", queryStr);

    db.query(queryStr, function(err, results) {
      if (err) {
        console.log("there was an error from db.query");
        throw new Error(err);
      }
      if (results.length === 0) {
        console.log("db.query came back with result length 0");
        createUsersProjectsEntry();
      } else if (results.length > 0) {
        console.log("db.query got users_projects_id", results[0]);
        var users_projects_id = results[0];
      }
    });
  }

  // Tolken handler, not sure if will use

  // decode: function (req, res, next) {
  //   var token = req.headers['x-access-token'];
  //   var user;
  //   if (!token) {
  //     return res.send(403); // send forbidden if a token is not provided
  //   }

  //   try {
  //     // decode token and attach user to the request
  //     // for use inside our controllers
  //     user = jwt.decode(token, 'secret');
  //     req.user = user;
  //     next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
};