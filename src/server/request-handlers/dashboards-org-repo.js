/*jshint loopfunc: true */
"use strict";

var db = require('../db');

// This request handler takes the orgname and reponame for a given dashboard and returns everything
// needed to render that dashboard page
//
// Example response object:
//
// {
//   dashboard: {
//     id: 1,
//     last_commit: 'somegithashkjsdflksdfj',
//     repo_link: 'github.com/AudibleBoulders/Audibleboulders.git',
//     branch: 'master,
//     org_name: 'AudibleBoulders',
//     repo_name: 'AudibleBoulders
//   },
//   users: [
//     {
//       id: 1,
//       github_username: 'yaliceme',
//       name: 'Alice',
//       set_up: true,
//       up_to_date: true,
//       diffs: [
//         { id: 123,
//           file: 'file/path/index.html',
//           mod_type: 'deleted',
//           commit_message: 'I made a commit'
//         }
//       ]
//     }
//   ]
// }

module.exports = {
  handleGet: function (req, res, next) {
    var org_name = req.params.orgName;
    var repo_name = req.params.repoName;
    var responseObject = {};

    // Retrieve dashboard details
    var selectStr = "SELECT id, repo_link, branch, org_name, repo_name, last_commit FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";

    db.query(selectStr, function(err, results) {
      if (err) {
        throw new Error(err);
      } else {
        responseObject.dashboard = results[0];

        // Retrieve user details for all users that are part of this dashboard
        var dashboardId = responseObject.dashboard.id;
        var joinStr = "SELECT users_dashboards.id, github_username, name FROM users_dashboards INNER JOIN users ON users_dashboards.users_id=users.id WHERE dashboards_id='" + dashboardId + "'";

        db.query(joinStr, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            responseObject.users = results;

            // For each user object, add a diffs property containing all their diffs for that dashboard
            for (var i = 0; i < responseObject.users.length; i++) {
              var thisUser = responseObject.users[i];
              var selectStr = "SELECT * FROM diffs WHERE users_dashboards_id='" + thisUser.id + "';";
              // note: thisUser.id is the users_dashboards.id, NOT the users.id

              db.query(selectStr, function (i, err, results) {
                if (err) {
                  throw new Error(err);
                }
                this.diffs = results;

                // if we are on the last iteration of the for loop, send the responseObject
                if (i >= responseObject.users.length - 1) {
                  res.json(responseObject);
                }
              }.bind(thisUser, i));
              // we needed to bind thisUser so that we will add the diffs results to the right user object, since the db.query happens asynchronously
              // we also needed to pass in i as an argument, so that we could keep track of which iteration of the for loop we're on. We only want to do res.json once we've finished the db.query that's associated with the last iteration
            }
          }
        });
      }
    });
  }
};
