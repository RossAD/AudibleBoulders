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
  }
};
