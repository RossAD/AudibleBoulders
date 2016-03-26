/*jslint node: true */
"use strict";

var helpers = require('./helpers.js');

// request handlers
var users = require('../new-request-handlers/users');
var dashboards = require('../new-request-handlers/dashboards');
var dashboardsGithubId = require('../new-request-handlers/dashboards-githubId');
var dashboardsOrgRepo = require('../new-request-handlers/dashboards-org-repo');
var setup = require('../new-request-handlers/setup');
var commits = require('../new-request-handlers/commits');
var usersDashboards = require('../new-request-handlers/usersDashboards');
var repos = require('../new-request-handlers/repos.js');

module.exports = function (app) {
  // Interact with dashboards
  app.post('/api/dashboards/', dashboards.handlePost); // for when user joins and/or creates a dashboard from #/add
  app.get('/api/dashboards/:githubId', dashboardsGithubId.handleGet); // for displaying all dashboards user has already joined, on #/home
  app.get('/api/dashboards/:orgName/:repoName', dashboardsOrgRepo.handleGet); // for getting all information needed to render a particular #/:orgName/:repoName dashbaorad
  app.delete('/api/users_dashboards/:githubId/:dashboardId', usersDashboards.handleDelete); // for when user removes themselves from a dashboard by clicking x on #/

  // Get signature hash etc for setup page
  app.get('/api/setup/:orgName/:repoName/:githubId', setup.handleGet);

  // 'Commit' interaction
  app.post('/api/commits/', commits.handlePost);

  // Get user GitHub Subscriptions
  app.get('/api/repos/', users.userSub);
  app.post('/api/repos/', repos.handlePost);

  // Error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
