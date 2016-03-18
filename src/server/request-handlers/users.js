"use strict";
var db = require('../db');
var request = require('request');
module.exports = {
  handlePost: function (req, res, next) {

  },

  postUser: function (profile, token) {
    var gitId = profile.id;
    var gitHandle = profile.login;
    var avatar = profile.avatar_url;
    var name = profile.name;
    var userQry = "SELECT id FROM users WHERE github_id='" + gitId.toString() + "'";
    // Check if user is in table
    db.query(userQry, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      console.log('query result: ', results);
      // If user NOT in table, add user
      if (results.length === 0) {
        var addUser = "INSERT into users (git_handle, name, github_id, github_avatar, git_token) VALUES ('"+ gitHandle +"','"+ name +"','"+ gitId +"','"+ avatar +"','"+ token +"')";
        db.query(addUser, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            return results;
          }
        });
      }
    });
  },

  getToken: function (gitID) {
    console.log('gitID ', gitID);
    var tokQry = "SELECT git_token FROM users WHERE github_id='" +  gitID.toString() + "'";
    db.query(tokQry, function (err, result) {
      if (err) {
        throw new Error(err);
      } else {
        console.log('token result: ', result[0].git_token);
        return result[0].git_token;
      }
    });
  },

  userSub: function (req, res, next) {
    console.log('what do we have? ',req.cookies);
    var id  = req.cookies.githubId;
    var gitHandle = req.cookies.githubName;
    console.log('GitHub ID and GitHub Handle: ', id, " ", gitHandle);
    var token;
    var help  = function (){
      token = module.exports.getToken(id);
    };
    help();
    console.log('Token: ', token);
    var options = {
      url: "https://api.github.com/users/"+ gitHandle +"/subscriptions",
      headers: {
        'User-Agent': 'GitSpy',
        authorization: 'token 9741f4c5bdbe36c107efe7ed21ce9d1a2b802385',
        'content-type': 'application/json'
      },
    };
    request.get(options, function(error, response, body) {
      console.log('options? ', options);
      if (error){
        throw new Error(error);
      } else {
        res.end(body);
      }
    });
  }

};
