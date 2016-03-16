"use strict";
var db = require('../db');

module.exports = {
  handlePost: function (req, res, next) {

  },

  postUser: function (profile) {
    var gitId = profile.id;
    var email = profile.email;
    var avatar = profile.avatar_url;
    console.log('------------>>>>>>>>> My profile!!!', profile);
    // var queryStr = "SELECT id FROM users WHERE users_id='" + gitId.toString() + "' AND dashboards_id='" + dashboards_id.toString() + "'";
    // console.log("queryStr:", queryStr);


  }
};
