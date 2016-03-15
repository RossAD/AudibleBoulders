var helpers = require('./helpers.js');

module.exports = function (app, express) {
  // 'helpers.testy' is a placeholder to test routing, replace with appropriate functions

  // Interact with users
  app.post('/api/users/', helpers.testy);

  // Interact with dashboards
  app.post('/api/dashboards/', helpers.testy);
  app.get('/api/dashboards/:userId', helpers.testy);
  app.get('/api/dashboards/:orgName/:repoName', helpers.testy);

  // 'Setup' routing
  app.get('/api/setup/:userId/:dashboardId', helpers.testy);

  // 'Commit' interaction
  app.post('/api/commits/', helpers.handleCommit);

  // Error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};