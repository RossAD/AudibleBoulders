"use strict";

var pool = require('../db/index.js').getPool();
var promise = require('bluebird');

// NOTE: when using the methods in this module, append "Async" to the end of the method name
var users_dashboards = module.exports = promise.promisifyAll({
  getOne: function (githubId, dashboardId, callback) {
    pool.query('SELECT * FROM users_dashboards WHERE users_github_id=? AND dashboards_id=?', [githubId, dashboardId], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        var recordObject = (results && results.length > 0) ? results[0] : null;
        callback(null, recordObject);
      }
    });
  },
  addOne: function (githubId, dashboardId, callback) {
    // use simple githubId + dashboardId concatenation for 'hash' for now, guarantees uniqueness. substitute a proper hash later
    var signatureHash = githubId.toString() + '@' + dashboardId.toString();
    pool.query('INSERT INTO users_dashboards (users_github_id, dashboards_id, set_up, signature_hash) VALUES (?, ?, 0, ?);', [githubId, dashboardId, signatureHash], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'New users_dashboards record created');
      }
    });
  },
  deleteOne: function (githubId, dashboardId, callback) {
    pool.query('DELETE FROM users_dashboards WHERE users_github_id=? AND dashboards_id=?', [githubId, dashboardId], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'User unassociated from dashboard');
      }
    });
  },
  updateOne: function (signatureHash, updateParams, callback) {
    // updateParams should include last_pulled_commit_sha1, last_pulled_commit_msg, and commit_branch
    // calling this method will also always set set_up to 1
    pool.query('UPDATE users_dashboards SET last_pulled_commit_sha1=?, last_pulled_commit_msg=?, commit_branch=?, set_up=1 WHERE signature_hash=?', [updateParams.last_pulled_commit_sha1, updateParams.last_pulled_commit_msg, updateParams.commit_branch, signatureHash], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'User is updated for this dashboard');
      }
    });
  }
});
