"use strict";

var db = require('../db');

module.exports = {
  handlePost: function (req, res, next) {
    var users_id = req.body.users_id;
    var dashboards_id = req.body.dashboard_id;
    var repo_link = req.body.repo_link;

    var queryStr = "SELECT id FROM users_dashboards WHERE users_id='" + users_id.toString() + "' AND dashboards_id='" + dashboards_id.toString() + "'";

    // Query for existing dashboard
    db.query(queryStr, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      if (results.length === 0) {
        // Create new dashboard and associate user to dashboard
        var createDashboard = "INSERT INTO dashboards (repo_link) VALUES ('" + repo_link + "');";
        var associateUser = "INSERT INTO user_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";

        db.query(createDashboard, function (err, results) {
          if (err) {
            throw new Error(err);
          } else {
            console.log('Successfully inserted into dashboard table');
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
      } else {
        // Add user to the dashboard
        var insertQuery = "INSERT INTO user_dashboards (users_id, dashboards_id, set_up, up_to_date) VALUES ('" + users_id.toString() + "', '" + dashboards_id.toString() + "', '0', '0');";

        db.query(insertQuery, function (err, results) {
          if (err) {
            throw new Error(err);
          }
          if (results) {
            console.log('Successfully inserted into users_dashboards table');
            res.send(201);
          }
        });
      }
    });
   }
};
