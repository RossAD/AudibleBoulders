/*jshint loopfunc: true */
"use strict";

var db = require('../db');

module.exports = {
  handleDelete: function (req, res, next) {
    var githubId = req.params.githubId;
    var dashboards_id = req.params.dashboardId;

    // get users_id based on githubId
    var selectUserStr = "SELECT * FROM users WHERE github_id='" + githubId + "'";
    db.query(selectUserStr, function (err, results) {
      if (err) {
        throw new Error(err);
      } else {
        var users_id = results[0].id;
        var selectUserDashboardStr = "SELECT * from users_dashboards WHERE users_id= '" + users_id + "' AND dashboards_id= '" + dashboards_id + "'";
        db.query(selectUserDashboardStr, function(err, results) {
          if (err) {
            throw new Error(err);
          } else {
            var users_dashboards_id = results[0].id;
            var selectDiffsStr = "SELECT * from diffs WHERE users_dashboards_id= '" + users_dashboards_id + "'";
            db.query(selectDiffsStr, function(err, results) {
              if (err) {
                throw new Error(err);
              } else {
                var diffs = results;
                var deleted = 0;

                if (diffs.length > 0) {
                  for (var i = 0; i < diffs.length; i++) {
                    var deleteDiffsStr = "DELETE from diffs WHERE id= '" + results[i].id + "'";
                    db.query(deleteDiffsStr, function(err, results) {
                      if (err) {
                        throw new Error(err);
                      } else {
                        deleted++;
                        if (deleted === diffs.length) {
                          var deleteUserDashboardStr = "DELETE from users_dashboards WHERE id= '" + users_dashboards_id + "'";
                          db.query(deleteUserDashboardStr, function(err, results) {
                            if (err) {
                              throw new Error(err);
                            } else {
                              res.json(results);
                            }
                          });
                        }
                      }
                    });
                  }
                } else {
                  var deleteUserDashboardStr = "DELETE from users_dashboards WHERE id= '" + users_dashboards_id + "'";
                  db.query(deleteUserDashboardStr, function(err, results) {
                    if (err) {
                      throw new Error(err);
                    } else {
                      res.json(results);
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }
};
