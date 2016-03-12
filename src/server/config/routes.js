var helpers = require('./helpers.js');

module.exports = function (app, express) {
  // Interact with Projects
  // 'helpers.testy' is a placeholder to test routing, replace with appropriate functions
  app.get('/api/project/:projectId', helpers.testy);
  app.get('/api/projects/:userId', helpers.testy);
  app.post('/api/projects/', helpers.testy);

  // Interact with users
  app.post('/api/users/', helpers.testy);

  // 'Setup' routing
  app.get('/api/setup/:userId/:projectId', helpers.testy);

  // 'Commit' interaction
  app.post('/api/commits/:userId/:projectId', helpers.testy);

  // Error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};