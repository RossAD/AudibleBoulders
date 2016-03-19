"use strict";

var db = require('../db');
var request = require('request');

module.exports = {
  // Function to grab specified users Git Token
  getToken: function (gitID, cb) {
    var tokQry = "SELECT git_token FROM users WHERE github_id='" +  gitID.toString() + "'";
    db.query(tokQry, function (err, result) {
      if (err) {
        throw new Error(err);
      } else {
        cb(result[0].git_token);
      }
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
  // Update Database with new repo information for Dashboard
  handlePost: function (req, res, next) {
    var githubId = req.cookies.githubId;
    var commitUrl = req.body.commits_url;
    commitUrl = commitUrl.slice(0,commitUrl.length-6);
    var commits;
    // Function to grab commit information
    module.exports.gitURL(githubId, commitUrl, function(commits){
      commits = commits;
      var last_commit = commits[0].sha;
      var dashboardDetails = {};
      dashboardDetails.repo_link = req.body.html_url;
      dashboardDetails.branch = req.body.default_branch;
      dashboardDetails.org_name = req.body.owner.login;
      dashboardDetails.repo_name = req.body.name;
      dashboardDetails.last_commit = last_commit;

      // find users_id based on githubId
      var selectStr = "SELECT id FROM users WHERE github_id='" + githubId.toString() + "';";
      db.query(selectStr, function (err, results) {
        if (err) {
          throw new Error (err);
        }
        if (results.length === 0) {
          console.log("user with this github_id is not found");
        } else {
          var users_id = results[0].id;
          // find or create the dashboard
          var findDashboard = "SELECT * FROM dashboards WHERE repo_link='" + dashboardDetails.repo_link.toString() + "';";
          // Check if dashboard exists
          db.query(findDashboard, function (err, results) {
            if (err) {
              throw new Error(err);
            }
            if (results.length === 0) {
              // Dashboard DOES NOT exist. Create dashboard and associate user to the dashboard
              var createDashboard = "INSERT INTO dashboards (repo_link, branch, org_name, repo_name, last_commit) VALUES ('" + dashboardDetails.repo_link + "', '" + dashboardDetails.branch + "', '" + dashboardDetails.org_name + "', '" + dashboardDetails.repo_name + "', '" + dashboardDetails.last_commit + "');";
              db.query(createDashboard, function (err, results) {
                if (err) {
                  throw new Error(err);
                }
                var dashboards_id = results.insertId;
                var associateUser = "INSERT INTO users_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";
                db.query(associateUser, function (err, results) {
                  if (err) {
                    throw new Error(err);
                  } else {
                    console.log('Successfully inserted into users_dashboards table');
                    res.send(201);
                  }
                });
              });
            } else {
              // Dashboard DOES exist. Check if user is already associated to dashboard, if not create the association.
              var dashboards_id = results[0].id;
              var checkUsersDashboard = "SELECT * FROM users_dashboards WHERE users_id='" + users_id.toString() + "' AND dashboards_id='" + dashboards_id.toString() + "'";
              db.query(checkUsersDashboard, function (err, results) {
                if (err) {
                  throw new Error(err);
                }
                if (results.length === 0) {
                  var associateUser = "INSERT INTO users_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";
                  db.query(associateUser, function (err, results) {
                    if (err) {
                      throw new Error(err);
                    } else {
                      res.send(201);
                    }
                  });
                } else {
                  res.send(201);
                }
              });
            }
          });
        }
      });
    });
  }
};
