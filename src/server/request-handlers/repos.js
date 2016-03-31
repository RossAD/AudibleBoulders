"use strict";
var github = require('../queries/github.js');
var request = require('request');
var users = require('../queries/users.js');

module.exports = {
  handlePost : function(req, res, next) {
    var gitID = req.cookies.githubId;
    users.getOneAsync(gitID)
      .then(function(usrObj){
        var token = usrObj.token;
        return github.queryAsync(req.body.link, usrObj.github_token);
      })
      .then(function(nextPage){
        res.json(nextPage);
      })
      .catch(function(e) {
        console.log("Error: ", e);
        res.sendStatus(400);
      });
  }
};
