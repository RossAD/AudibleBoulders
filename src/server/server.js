var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// Test Response for functionality
// router.get('/', function(req, res){
//   res.json({message : 'Welcome to our Awesome server!'});
// });

app.use('/api', router);

app.listen(port);
console.log('This is where it all begins... on port: ' + port);