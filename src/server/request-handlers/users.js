"use strict";
var db = require('../db');

module.exports = {
  handlePost: function (req, res, next) {

  },

  postUser: function (profile) {
    var gitId = profile.id;
    var gitHandle = profile.login;
    var avatar = profile.avatar_url;
    var name = profile.name;
    var userQry = "SELECT id FROM users WHERE githubId='" + gitId.toString() + "'";
    console.log("queryStr:", userQry);
    // Check if user is in table
    db.query(userQry, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      console.log('query result: ', results);
      // If user NOT in table, add user
      if (results.length === 0) {
        var addUser = "INSERT into users (gitHandle, name, githubId, githubAvatar) VALUES ('"+ gitHandle +"','"+ name +"','"+ gitId +"','"+ avatar +"')";
        db.query(addUser, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            console.log('User successfully added to table', results);
          }
        });
      }
    });
    console.log('------------>>>>>>>>>>>Logging In: ', profile.name);
  }
};
