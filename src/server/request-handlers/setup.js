"use strict";

var db = require('../db');

module.exports = {
  handleGet: function (req, res, next) {
    var org_name = req.params.orgName;
    var repo_name = req.params.repoName;
    var githubId = req.params.githubId;
    var responseObject = {};

    var selectStr = "SELECT * FROM users WHERE github_id='" + githubId + "';";
    db.query(selectStr, function (err, results) {
      if (err) {
        throw new Error(err);
      } else {
        responseObject.users_id = results[0].id;
        console.log('user query: ', results);
        var selectStr = "SELECT * FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";
        db.query(selectStr, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            console.log('dashboards id', results);
            responseObject.dashboards_id = results[0].id;

            res.json(responseObject);
          }
        });
      }
    });
  }
};
