/*jshint loopfunc: true */
"use strict";

var users_dashboards = require('../queries/users_dashboards.js');
var diffs = require('../queries/diffs.js');

module.exports = {
  handlePost: function (req, res, next) {
    var dashboards_signature_hash = req.body.dashboards_signature_hash;
    var diffs = req.body.diffs;
    var new_params = {
      last_pulled_commit_sha1: req.body.last_pulled_commit_sha1,
      last_pulled_commit_msg: req.body.last_pulled_commit_msg,
      commit_branch: req.body.commit_branch
    }

    users_dashboards.updateOneAsync(dashboards_signature_hash, new_params)
      .then(function() {
        return diffs.deleteAllAsync(dashboards_signature_hash);
      })
      .then(function() {
        return diffs.addAllAsync(dashboards_signature_hash, diffs);
      })
      .catch(function(e) {
        console.log("Error: ", e);
      });
  }
};
