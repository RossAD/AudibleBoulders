/*jslint node: true */
"use strict";

var helpers = require('./helpers.js');

// request handlers
var commits = require('../request-handlers/commits');
var dashboardsUserId = require('../request-handlers/dashboards-userId');
var dashboardsOrgRepo = require('../request-handlers/dashboards-org-repo');
var setup = require('../request-handlers/setup');

module.exports = function (app) {
  // 'helpers.testy' is a placeholder to test routing, replace with appropriate functions

  // Interact with users
  app.post('/api/users/', helpers.testy);

  // Interact with dashboards
  app.post('/api/dashboards/', helpers.testy);
  app.get('/api/dashboards/:userId', dashboardsUserId.handleGet);
  app.get('/api/dashboards/:orgName/:repoName', dashboardsOrgRepo.handleGet);

  // 'Setup' routing
  app.get('/api/setup/:userId/:dashboardId', setup.handleGet);

  // 'Commit' interaction
  app.post('/api/commits/', commits.handlePost);

  // Error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
