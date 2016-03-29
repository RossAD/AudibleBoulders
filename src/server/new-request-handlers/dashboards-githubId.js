"use strict";

var dashboards = require('../queries/dashboards.js');

module.exports = {
  handleGet: function (req, res, next) {
    var githubId = req.params.githubId;
    dashboards.getAllByGithubIdAsync(githubId)
      .then(function(dashboards) {
        res.json(dashboards);
      })
      .catch(function(e) {
        console.log("Error: ", e);
      });
  }
};
