"use strict";
var github = require('../queries/github.js');
var request = require('request');
var users = require('../queries/users.js');

module.exports = {
  handleGet: function (req, res, next) {
    var githubId = req.cookies.githubId;
    users.getOneAsync(githubId)
      .then(function (userObject) {
        var options = {
          url: "https://api.github.com/user/repos",
          headers: {
            'User-Agent': 'GitSpy',
            authorization: 'token '+ userObject.github_token,
            'content-type': 'application/json'
          }
        };
        request.get(options, function(error, response, body) {
          if (error){
            throw new Error(error);
          } else {
            res.json(response);
          }
        });
      })
      .catch(function (err) {
        console.error(err);
        res.sendStatus(400);
      });
  },
  handlePost : function(req, res, next) {
    var gitID = req.cookies.githubId;
    users.getOneAsync(gitID)
      .then(function(userObject){
        var token = userObject.token;
        return github.queryAsync(req.body.link, userObject.github_token);
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
