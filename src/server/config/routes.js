/*jslint node: true */
"use strict";

var helpers = require('./helpers.js');

// request handlers
var users = require('../request-handlers/users');
var dashboards = require('../request-handlers/dashboards');
var dashboardsGithubId = require('../request-handlers/dashboards-githubId');
var dashboardsOrgRepo = require('../request-handlers/dashboards-org-repo');
var setup = require('../request-handlers/setup');
var commits = require('../request-handlers/commits');
var usersDashboards = require('../request-handlers/usersDashboards');
var repos = require('../request-handlers/repos.js');

module.exports = function (app) {
  // 'helpers.testy' is a placeholder to test routing, replace with appropriate functions

  // Interact with dashboards
  app.post('/api/dashboards/', dashboards.handlePost);
  app.get('/api/dashboards/:githubId', dashboardsGithubId.handleGet);
  app.get('/api/dashboards/:orgName/:repoName', dashboardsOrgRepo.handleGet);
  app.delete('/api/users_dashboards/:githubId/:dashboardId', usersDashboards.handleDelete);

  // Get signature hash etc for setup page
  app.get('/api/setup/:orgName/:repoName/:githubId', setup.handleGet);

  // 'Commit' interaction
  app.post('/api/commits/', commits.handlePost);

  // Get user GitHub Subscriptions
  app.get('/api/subscriptions/', users.userSub);
  app.post('/api/repos/' , repos.handlePost);

  // Error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
