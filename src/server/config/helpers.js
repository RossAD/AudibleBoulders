// var jwt = require('jwt-simple');
var db = require('./db');

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  // Dummy function to test routes
  testy: function (req, res, next) {
    res.json("Route Succesful");
  },

  handleCommit: function (req, res, next) {
    var users_id = req.body.users_id;
    var projects_id = req.body.projects_id;
    var last_pulled_commit = req.body.last_pulled_commit;
    var diffs = req.body.diffs;
    console.log("got req.body.users_id:", req.body.users_id);
    console.log("got req.body.projects_id:", req.body.projects_id);
    console.log("got req.body.last_pulled_commit:", req.body.last_pulled_commit);
    console.log("got req.body.diffs:", req.body.diffs);
    res.json("You made a POST to /api/commits/");
  }

  // Tolken handler, not sure if will use

  // decode: function (req, res, next) {
  //   var token = req.headers['x-access-token'];
  //   var user;
  //   if (!token) {
  //     return res.send(403); // send forbidden if a token is not provided
  //   }

  //   try {
  //     // decode token and attach user to the request
  //     // for use inside our controllers
  //     user = jwt.decode(token, 'secret');
  //     req.user = user;
  //     next();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
};