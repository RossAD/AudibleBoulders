"use strict";
var helper = require('../config/helpers.js');
var request = require('request');

// Akshay Git Id 4003102
module.exports = {
  handlePost : function(req, res, next) {
    var gitID = req.cookies.gitHubId;
    helper.gitURL(gitID, req.body.link, function(nextPage){
      res.json(nextPage);
    });
  }
};

