"use strict";

var dashboards = require('../queries/dashboards');
var users_dashboards = require('../queries/users_dashboards');

module.exports = {
  handlePost: function (req, res, next) {
    var githubId = req.cookies.githubId;
    var orgName = req.body.org_name;
    var repoName = req.body.repo_name;

    // find or create the dashboard
    dashboards.findOrCreateAsync(orgName, repoName)
      .then(function (result) {
        if (result.isNewDashboard) {
          // dashboard is new, add users_dashboards record immediately
          users_dashboards.addOneAsync(githubId, result.dashboards_id);
        } else {
          // dashboard exists already, check if users_dashboards record also exists already
          var dashboardId = result.dashboards_id;
          users_dashboards.getOneAsync(githubId, dashboardId)
            .then(function (result) {
              if (!result) {
                // users_dashboards record does not yet exist, add it
                users_dashboards.addOneAsync(githubId, dashboardId);
              }
            });
        }
      });
  }
};
