/*jshint loopfunc: true */
"use strict";

var db = require('../db');
var request = require('request');
var pool = require('../db/index.js');

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
//       set_up: 1,
//       last_pulled_commit: 'some_sha1_hash_sdfdsfasd'
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
  // TODO: getToken and gitURL are copied from dashboards.js, factor them out into own file later
  // Function to grab specified users Git Token
  getToken: function (gitID, cb) {
    var tokQry = "SELECT git_token FROM users WHERE github_id='" +  gitID.toString() + "'";
    pool.getConnection(function(err, connection){
      if(err) {
        throw err;
      }
      connection.query(tokQry, function (err, result) {
        if (err) {
          throw new Error(err);
        } else {
          cb(result[0].git_token);
        }
      });
    });
  },
  // Function to grab Information from specified URL
  gitURL: function (id, url, callback) {
    var token;
    module.exports.getToken(id,function(token){
      token = token;
      var options = {
        url: url,
        headers: {
          'User-Agent': 'GitSpy',
          authorization: 'token '+ token,
          'content-type': 'application/json'
        },
      };
      request.get(options, function(error, response, body) {
        if (error){
          throw new Error(error);
        } else {
          callback(JSON.parse(body));
        }
      });
    });
  },
  updateLastCommit: function (githubId, org_name, repo_name, callback) {
    var commitUrl = 'https://api.github.com/repos/' + org_name + '/' + repo_name + '/commits';

    module.exports.gitURL(githubId, commitUrl, function (commits) {
      var currentLastCommit = commits[0].sha;

      var selectStr = "SELECT last_commit FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";
      pool.getConnection(function(err, connection){
        if(err) {
          throw err;
        }
        connection.query(selectStr, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            var last_commit = results[0].last_commit;
            if (currentLastCommit !== last_commit) {
              var updateStr = "UPDATE dashboards SET last_commit='" + currentLastCommit + "' WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";
              connection.query(updateStr, function (err, results) {
                if (err) {
                  throw new Error(err);
                } else {
                  callback();
                }
              });
            } else {
              callback();
            }
          }
        });
      });
    });
  },
  handleGet: function (req, res, next) {
    var responseObject = {};
    var githubId = req.cookies.githubId;
    var org_name = req.params.orgName;
    var repo_name = req.params.repoName;

    // Update last_commit if needed
    module.exports.updateLastCommit(githubId, org_name, repo_name, function () {
      // Now that last_commit is up to date, build and send responseObject
      // =================================================================
      // Retrieve dashboard details
      var selectStr = "SELECT id, repo_link, branch, org_name, repo_name, last_commit FROM dashboards WHERE org_name='" + org_name + "' AND repo_name='" + repo_name + "'";
      pool.getConnection(function(err, connection){
        if(err) {
          throw err;
        }
        connection.query(selectStr, function(err, results) {
          if (err) {
            throw new Error(err);
          } else {
            responseObject.dashboard = results[0];

            // Retrieve user details for all users that are part of this dashboard
            var dashboardId = responseObject.dashboard.id;
            var joinStr = "SELECT users_dashboards.id, git_handle, name, github_id, github_avatar, set_up, last_pulled_commit FROM users_dashboards INNER JOIN users ON users_dashboards.users_id=users.id WHERE dashboards_id='" + dashboardId + "'";

            connection.query(joinStr, function (err, results) {
              if (err) {
                throw new Error(err);
              } else {
                responseObject.users = results;

                // For each user object, add a diffs property containing all their diffs for that dashboard
                for (var i = 0; i < responseObject.users.length; i++) {
                  var thisUser = responseObject.users[i];

                  // note: thisUser.id is the users_dashboards.id, NOT the users.id
                  var selectStr = "SELECT * FROM diffs WHERE users_dashboards_id='" + thisUser.id + "';";
                  connection.query(selectStr, function (i, err, results) {
                    if (err) {
                      throw new Error(err);
                    }
                    this.diffs = results;

                    // TODO: make this check the total number of completed diffs queries instead of i, since it's possible that the last query may complete while previous ones are still in process
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
      });
    });
  }
};
