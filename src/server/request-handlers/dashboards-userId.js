"use strict";

var db = require('../db');

module.exports = {
  handleGet: function (req, res, next) {
    var users_id = req.params.userId;

    var selectStr = "SELECT dashboards.id, repo_link, branch, org_name, repo_name, last_commit FROM users_dashboards INNER JOIN dashboards ON users_dashboards.dashboards_id=dashboards.id WHERE users_id='" + users_id + "'";

    db.query(selectStr, function(err, results) {
      if (err) {
        throw new Error(err);
      } else {
        res.json(results);
      }
    });
  }
};
