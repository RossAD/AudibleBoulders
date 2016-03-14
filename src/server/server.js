var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var bodyparser = require('body-parser');
var db = require('./db');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});