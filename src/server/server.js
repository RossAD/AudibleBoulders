var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var db = require('./db');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var port = process.env.PORT || 8080;

var router = express.Router();

// Test Response for functionality
// router.get('/', function(req, res){
//   res.json({message : 'Welcome to our Awesome server!'});
// });

// Routes for GitHelperServer


app.use('/api', router);

app.listen(port);
console.log('This is where it all begins... on port: ' + port);

module.exports = app;
