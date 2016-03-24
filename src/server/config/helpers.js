/*jslint node: true*/
"use strict";

var db = require('../db');
var pool = require('../db/index.js');
var request = require('request');

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
  // Function to get users Git token from DB
  getToken: function (gitID, cb) {
    var tokQry = "SELECT git_token FROM users WHERE github_id='" +  gitID.toString() + "'";
    pool.getConnection(function(err, connection){
      if(err) {
        throw err;
      }
      connection.query(tokQry, function (err, result) {
        if (err) {
          throw new Error(err);
        } else {
          cb(result[0].git_token);
        }
      });
    });
  },
  // Function to grab Information from specified URL
  gitURL: function (id, url, callback) {
    var token;
    console.log('Git ID: ', id);
    module.exports.getToken(id,function(token){
      token = token;
      var options = {
        url: url,
        headers: {
          'User-Agent': 'GitSpy',
          authorization: 'token '+ token,
          'content-type': 'application/json'
        },
      };
      request.get(options, function(error, response, body) {
        if (error){
          throw new Error(error);
        } else {
          callback(response);
        }
      });
    });
  },
};
