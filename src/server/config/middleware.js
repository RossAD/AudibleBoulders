var morgan = require('morgan');
var bodyParser = require('body-parser');

// Processes to be run on every intaction with server
module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
};