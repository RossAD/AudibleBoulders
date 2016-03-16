"use strict";
var db = require('../db');

module.exports = {
  handlePost: function (req, res, next) {

  },

  postUser: function (profile) {
    var gitId = profile.id;
    var email = profile.email;
    var avatar = profile.avatar_url;
    var userName = profile.name;
    console.log('------------>>>>>>>>>>>Logging In: ', profile.name);
    var queryStr = "SELECT id FROM users WHERE users_id='" + gitId.toString() + "' AND dashboards_id='" + gitId.toString() + "'";
    console.log("queryStr:", queryStr);


  }
};
