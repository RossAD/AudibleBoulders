"use strict";

var pool = require('../db/index.js');

module.exports = {
  // NOTE: by "return", we really mean "pass to callback as results arg"

  getOne: function (orgName, repoName, callback) {
    // return dashboard object (with all fields) or null if none
    pool.getConnection(function (err, connection) {
      if (err) {
        throw new Error(err);
      }
      var selectStr = "SELECT * FROM dashboards WHERE org_name='" + orgName + "' AND repo_name='" + repoName + "';";
      connection.query(selectStr, function (err, results) {
        var dashboardObject = (results && results.length > 0) ? results[0] : null;
        callback(err, dashboardObject);
        connection.release();
      });
    });
  },
  getAll: function (githubId, callback) {
    // return an array of all dashboard objects (with all fields) associated with github_id
    pool.getConnection(function (err, connection) {
      if (err) {
        throw new Error(err);
      }
      var selectStr = "SELECT dashboards.id, org_name, repo_name, branch_name, last_commit_sha1, last_commit_msg FROM users_dashboards INNER JOIN dashboards ON users_dashboards.dashboards_id=dashboards.id WHERE users_github_id='" + githubId + "';";
      connection.query(selectStr, function (err, results) {
        callback(err, results);
        connection.release();
      });
    });
  },
  updateLastCommit: function (newSha1, newMsg, orgName, repoName, callback) {
    // no return value
  },
  findOrCreate: function (orgName, repoName, callback) {
    // return id and a bool for whether it was a find or a create
  }
};
