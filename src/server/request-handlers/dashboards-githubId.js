"use strict";

var db = require('../db');

module.exports = {
  handleGet: function (req, res, next) {
    var githubId = req.params.githubId;

    // get users_id based on githubId
    var selectStr = "SELECT * FROM users WHERE github_id='" + githubId + "'";
    db.query(selectStr, function (err, results) {
      if (err) {
        throw new Error(err);
      } else {
        var users_id = results[0].id;

        // get dashboard details based on users_id, send as respons
        var selectStr = "SELECT dashboards.id, repo_link, branch, org_name, repo_name, last_commit FROM users_dashboards INNER JOIN dashboards ON users_dashboards.dashboards_id=dashboards.id WHERE users_id='" + users_id + "'";
        db.query(selectStr, function(err, results) {
          if (err) {
            throw new Error(err);
          } else {
            res.json(results);
          }
        });
      }
    });
  }
};
