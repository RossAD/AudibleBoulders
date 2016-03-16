"use strict";

var db = require('../db');

module.exports = {
  handlePost: function (req, res, next) {
    var users_id = req.body.users_id;
    var repo_link = req.body.repo_link;

    // var dashboards_id = req.body.dashboards_id;

    var findDashboard = "SELECT * FROM dashboards WHERE repo_link='" + repo_link.toString() + "';";

    // Query for existing dashboard
    db.query(findDashboard, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      if (results.length === 0) {
        // Dashboard doesn't exist, create dashboard and associate user to the dashboard
        var createDashboard = "INSERT INTO dashboards (repo_link) VALUES ('" + repo_link + "');";
        db.query(createDashboard, function (err, results) {
          if (err) {
            throw new Error(err);
          }
          var dashboards_id = results.insertId;
          var associateUser = "INSERT INTO user_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";
          db.query(associateUser, function (err, results) {
            if (err) {
              throw new Error(err);
            } else {
              console.log('Successfully inserted into users_dashboards table');
              res.send(201);
            }
          });
        });
      } else {
        // Dashboard does exist, associate user with dashboard
        var dashboards_id = results[0].id;
        var associateUser = "INSERT INTO users_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";
        db.query(associateUser, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            console.log('Successfully inserted into users_dashboards table');
            res.send(201);
          }
        });
      }
    });
  }
};
