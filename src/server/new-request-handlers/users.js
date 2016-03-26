"use strict";

var request = require('request');
var pool = require('../db/index.js');
var users = require('../queries/users.js');

module.exports = {
  userSub: function (req, res, next) {
    var githubId  = req.cookies.githubId;
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
      });
  }
};
