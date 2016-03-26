"use strict";

var pool = require('../db/index.js').getPool();
var promise = require('bluebird');

// NOTE: when using the methods in this module, append "Async" to the end of the method name
var dashboards = module.exports = promise.promisifyAll({
  // NOTE: by "return", we really mean "pass to callback as results arg"

  getOne: function (orgName, repoName, callback) {
    // return dashboard object (with all fields) or null if none
  },
  getAll: function (githubId, callback) {
    // return an array of all dashboard objects (with all fields) associated with github_id
  },
  updateLastCommit: function (newSha1, newMsg, orgName, repoName, callback) {
    // no return value
  },
  findOrCreate: function (orgName, repoName, callback) {
    // return id and a bool for whether it was a find or a create
    // e.g. {dashboards_id: 1234, isNewDashboard: true}

    // call getOne to see if dashboard already exists
    dashboards.getOne(orgName, repoName, function (err, dashboardObject) {
      if (err) {
        callback(err, null);
      } else if (dashboardObject) {
        // dashboard DOES exist - pass its id to callback, with false bool for isNewDashboard
        callback(null, {dashboards_id: dashboardObject.id, isNewDashboard: false});
      } else {
        // dashboard DOES NOT exist - create a new dashboard entry
        pool.getConnection(function (err, connection) {
          if (err) {
            throw new Error(err);
          }
          // TODO: eventually, we will pass in branchName as an arg and use that, for now default to master
          var branchName = "master";
          var insertStr = "INSERT INTO dashboards (org_name, repo_name, branch_name) VALUES ('" + orgName + "', '" + repoName + "', '" + branchName + "');";
          connection.query(insertStr, function (err, results) {
            if (err) {
              callback(err, null);
            } else {
              var dashboards_id = results.insertId;
              callback(null, {dashboards_id: dashboards_id, isNewDashboard: true});
            }
            connection.release();
          });
        });
      }
    });
  }
});
