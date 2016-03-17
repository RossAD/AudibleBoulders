"use strict";

var db = require('../db');

var createUsersDashboardsEntry = function() {
  console.log('createUsersDashboardsEntry called');
};

module.exports = {
  handlePost: function (req, res, next) {
    var dashboards_id = req.body.dashboards_id;
    var diffs = req.body.diffs;
    var last_pulled_commit = req.body.last_pulled_commit;
    var users_id = req.body.users_id;

    var findUserDashboards = "SELECT * FROM users_dashboards WHERE users_id='" + users_id.toString() + "' AND dashboards_id='" + dashboards_id + "';";
    db.query(findUserDashboards, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      if (results.length === 0) {
        // Cannot find user/dashboard association
        console.log('Did not find user/dash association');
      } else {
        // Found user/dash association
        var users_dashboards_id = results[0].id;
        var deleteDiffs = "DELETE FROM diffs WHERE users_dashboards_id='" + users_dashboards_id + "';";
        db.query(deleteDiffs, function (err, results) {
          if (err) {
            throw new Error(err);
          }
          console.log('Old diffs have been removed...');
          for (var i = 0; i < diffs.length; i++) {
            var insertDiff = "INSERT INTO diffs (file, mod_type, commit_message, users_dashboards_id) VALUES ('" + diffs[i].file + "', '" + diffs[i].mod_type + "', '" + diffs[i].commit_message + "', '" + users_dashboards_id + "';";
            // db.query(insertDiff, function (err, results) {
            //   if (err) {
            //     throw new Error(err);
            //   }
            //   console.log('Created a new diff');
            // });
          }
          var checkLastCommit = "SELECT last_commit FROM dashboards WHERE id='" + dashboards_id.toString() + "';";
          db.query(checkLastCommit, function (err, results) {
            if (err) {
              throw new Error(err);
            }
            if (results[0].last_commit !== last_pulled_commit) {
              // Update the 'up_to_date' record to false
            } else {
              // Update the 'up_to_date' record to true
            }
          });
        });
      }
    });
    // 1) find an entry in users_dashboards table given userid and dashid, return its record id in users_dashboards
    // 2) delete all entries from diffs table where users_dashboards_id matches above
    // 3) iterate through req.body.diffs, make a new entry in diffs table for each
    // 4) query dashboards and check if last_commit is eq to last_pulled_commit, if not, see up_to_date for that user to false.
  }
};
