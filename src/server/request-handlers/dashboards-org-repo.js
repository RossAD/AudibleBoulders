"use strict";

var db = require('../db');

module.exports = {
  handleGet: function (req, res, next) {
    var org_name = req.params.orgName;
    var repo_name = req.params.repoName;
    var responseObject = {};

    // Create a sql query to retrieve dashboard fields
    var selectStr = "SELECT id, repo_link, branch, org_name, repo_name, last_commit FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";

    db.query(selectStr, function(err, results) {
      if (err) {
        throw new Error(err);
      } else {
        responseObject.dashboard = results[0];
        var dashboardId = results[0].id;

        // Create a sql query to get user details
        var joinStr = "SELECT users_dashboards.id, github_username, name FROM users_dashboards INNER JOIN users ON users_dashboards.users_id=users.id WHERE dashboards_id='" + dashboardId + "'";

        db.query(joinStr, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            responseObject.users = results;
            res.json(responseObject);
            // for (var i = 0; i < responseObject.users.length; i++) {
            //   var thisUser = responseObject.users[i];
            //   db.query.bind(responseObject.users[i])("SELECT * FROM diffs WHERE users_dashboards_id='" + this.id + "';", function (err, results) {
            //     if (err) {
            //       throw new Error(err);
            //     }
            //     this.diffs = results;
            //     if (i >= responseObject.users.length - 1) {
            //       res.json(responseObject);
            //     }
            //   });
            // }

          }
        });


      }
    });

  }
};
