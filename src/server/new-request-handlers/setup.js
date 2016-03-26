"use strict";

var users_dashboards = require('../queries/users_dashboards.js');

module.exports = {
  handleGet: function (req, res, next) {
    var dashboardId = req.params.dashboardId;
    var githubId = req.params.githubId;

    users_dashboards.getOneAsync(githubId, dashboardId, function(user_dashboard) {
      res.json(user_dashboard);
    });
  }
};
