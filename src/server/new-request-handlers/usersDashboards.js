/*jshint loopfunc: true */
"use strict";

var pool = require('../db/index.js');
var users = require('../queries/users.js');
var usersDashboards = require('../queries/users_dashboards.js');
var diffs = require('../queries/diffs.js');

module.exports = {

  handleDelete: function(req, res, next) {
    var githubId = req.params.githubId;
    var dashboards_id = req.params.dashboardId;

    users.getOneAsync(githubId)
      .then(function (user) {
        return usersDashboards.getOneAsync(githubId, dashboards_id);
      })
      .then(function (userDashboard) {
        return diffs.getAllAsync(userDashboard.signature_hash);
      })
      .then(function (userDiffs) {
        if (userDiffs.length > 0) {
          return diffs.deleteAllAsync(userDiffs[0].users_dashboards_signature_hash);
        }
        return;
      })
      .then(function () {
        return usersDashboards.deleteOneAsync(githubId, dashboards_id);
      })
      .then(function (results) {
        res.json(results);
      })
      .catch(function(e) {
        console.log("Error: ", e);
      });
  }
};
