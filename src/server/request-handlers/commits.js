"use strict";

var db = require('../db');

var createUsersDashboardsEntry = function() {
  console.log('createUsersDashboardsEntry called');
};

module.exports = {
  handleCommit: function (req, res, next) {
    var users_id = req.body.users_id;
    var dashboards_id = req.body.dashboards_id;
    var last_pulled_commit = req.body.last_pulled_commit;
    var diffs = req.body.diffs;
    console.log("got req.body.users_id:", req.body.users_id);
    console.log("got req.body.dashboards_id:", req.body.dashboards_id);
    console.log("got req.body.last_pulled_commit:", req.body.last_pulled_commit);
    console.log("got req.body.diffs:", req.body.diffs);
    res.json("You made a POST to /api/commits/");

    // 1) find or create an entry in users_dashboards table, return its record id
    // 2) delete all entries from diffs table where users_dashboards_id matches above
    // 3) iterate through req.body.diffs, make a new entry in diffs table for each

    var queryStr = "SELECT id FROM users_dashboards WHERE users_id='" + users_id.toString() + "' AND dashboards_id='" + dashboards_id.toString() + "'";
    console.log("queryStr:", queryStr);

    db.query(queryStr, function(err, results) {
      if (err) {
        console.log("there was an error from db.query");
        throw new Error(err);
      }
      if (results.length === 0) {
        console.log("db.query came back with result length 0");
        createUsersDashboardsEntry();
      } else if (results.length > 0) {
        console.log("db.query got users_dashboards_id", results[0]);
        var users_dashboards_id = results[0];
      }
    });
  }
};
