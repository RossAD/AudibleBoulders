"use strict";

var db = require('../db');
var pool = require('../db/index.js');

module.exports = {
  handleGet: function (req, res, next) {
    var org_name = req.params.orgName;
    var repo_name = req.params.repoName;
    var githubId = req.params.githubId;
    var responseObject = {};

    var selectStr = "SELECT * FROM users WHERE github_id='" + githubId + "';";
    pool.getConnection(function(err, connection){
      if(err) {
        throw err;
      }
      connection.query(selectStr, function (err, results) {
        if (err) {
          throw new Error(err);
        } else {
          responseObject.users_id = results[0].id;
          var selectStr = "SELECT * FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";
          connection.query(selectStr, function (err, results) {
            if (err) {
              throw new Error(err);
            } else {
              responseObject.dashboards_id = results[0].id;

              res.json(responseObject);
            }
          });
        }
      });
    });
  }
};
