"use strict";

var dashboards = require('../queries/dashboards.js');

module.exports = {
  handleGet: function (req, res, next) {
    var githubId = req.params.githubId;
    dashboards.getAllByGithubIdAsync(function(dashboards) {
      res.json(dashboards);
    });
  }
};
