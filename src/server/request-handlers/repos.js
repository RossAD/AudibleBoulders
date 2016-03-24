"use strict";
var helper = require('../config/helpers.js');
var request = require('request');

module.exports = {
  handlePost : function(req, res, next) {
    var gitID = req.cookies.githubId;
    helper.gitURL(gitID, req.body.link, function(nextPage){
      res.json(nextPage);
    });
  }
};
