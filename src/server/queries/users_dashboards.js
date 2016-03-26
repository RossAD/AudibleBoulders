"use strict";

var pool = require('../db/index.js').getPool();
var promise = require('bluebird');

// NOTE: when using the methods in this module, append "Async" to the end of the method name
var users_dashboards = module.exports = promise.promisifyAll({
  getOne: function (githubId, dashboardId, callback) {
    var selectStr = "SELECT * FROM users_dashboards WHERE users_github_id=" + githubId + " AND dashboards_id=" + dashboardId + ";";
    pool.query(selectStr, function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        var recordObject = (results && results.length > 0) ? results[0] : null;
        callback(null, recordObject);
      }
    });
  },
  addOne: function (githubId, dashboardId, callback) {
    // use simple githubId + dashboardId concatenation for "hash" for now, guarantees uniqueness. substitute a proper hash later
    var signatureHash = githubId.toString + '@' + dashboardId.toString();
    var insertStr = "INSERT INTO users_dashboards (users_github_id, dashboards_id, set_up, signature_hash) VALUES (" + githubId.toString() + ", " + dashboardId.toString() + ", 0, '" + signatureHash + "');";
    pool.query(insertStr, function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "New users_dashboards record created");
      }
    });
  },
  deleteOne: function (githubId, dashboardId, callback) {
    var deleteStr = "DELETE FROM users_dashboards WHERE users_github_id=" + githubId + " AND dashboards_id=" + dashboardId + ";";
    pool.query(deleteStr, function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "User unassociated from dashboard");
      }
    });
  },
  updateOne: function (signatureHash, updateParams, callback) {
    // updateParams should include last_pulled_commit_sha1, last_pulled_commit_msg, and commit_branch
    // calling this method will also always set set_up to 1
    var updateStr = "UPDATE users_dashboards SET last_pulled_commit_sha1='" + updateParams.last_pulled_commit_sha1 + "', last_pulled_commit_msg='" + updateParams.last_pulled_commit_msg + "', commit_branch='" + updateParams.commit_branch + "', set_up=1 WHERE signature_hash='" + signatureHash + "';";
    pool.query(updateStr, function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "User is updated for this dashboard");
      }
    });
  }
});
