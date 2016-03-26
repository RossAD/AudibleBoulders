/*jshint loopfunc: true */
"use strict";

var pool = require('../db/index.js');
var users = require('../queries/users.js');
var usersDashboards = require('../queries/users_dashboards.js');

module.exports = {

  handleDelete: function(req, res, next) {
    var githubId = req.params.githubId;
    var dashboards_id = req.params.dashboardId;

    users.getOneAsync(githubId)
      .then(function (user) {
        console.log('user: ', user);
        return usersDashboards.getOneAsync(githubId, dashboards_id);
      })
      .then(function (userDashboard) {
        console.log('ud:', userDashboard);
      });
  }

    // get users_id based on githubId
    // var selectUserStr = "SELECT * FROM users WHERE github_id='" + githubId + "'";
    // pool.getConnection(function(err, connection){
    //   if(err) {
    //     throw err;
    //   }
      // connection.query(selectUserStr, function (err, results) {
      //   if (err) {
      //     throw new Error(err);
      //   } else {
      //     var users_id = results[0].id;
      //     var selectUserDashboardStr = "SELECT * from users_dashboards WHERE users_id= '" + users_id + "' AND dashboards_id= '" + dashboards_id + "'";
      //     connection.query(selectUserDashboardStr, function(err, results) {
      //       if (err) {
      //         throw new Error(err);
      //       } else {
      //         var users_dashboards_id = results[0].id;
      //         var selectDiffsStr = "SELECT * from diffs WHERE users_dashboards_id= '" + users_dashboards_id + "'";
      //         connection.query(selectDiffsStr, function(err, results) {
      //           if (err) {
      //             throw new Error(err);
      //           } else {
      //             var diffs = results;
      //             var deleted = 0;

      //             if (diffs.length > 0) {
      //               for (var i = 0; i < diffs.length; i++) {
      //                 var deleteDiffsStr = "DELETE from diffs WHERE id= '" + results[i].id + "'";
      //                 connection.query(deleteDiffsStr, function(err, results) {
      //                   if (err) {
      //                     throw new Error(err);
      //                   } else {
      //                     deleted++;
      //                     if (deleted === diffs.length) {
      //                       var deleteUserDashboardStr = "DELETE from users_dashboards WHERE id= '" + users_dashboards_id + "'";
      //                       connection.query(deleteUserDashboardStr, function(err, results) {
      //                         if (err) {
      //                           throw new Error(err);
      //                         } else {
      //                           res.json(results);
      //                         }
      //                       });
      //                     }
      //                   }
      //                 });
      //               }
      //             } else {
      //               var deleteUserDashboardStr = "DELETE from users_dashboards WHERE id= '" + users_dashboards_id + "'";
      //               connection.query(deleteUserDashboardStr, function(err, results) {
      //                 if (err) {
      //                   throw new Error(err);
      //                 } else {
      //                   res.json(results);
      //                 }
      //               });
      //             }
      //           }
      //         });
      //       }
      //     });
      //   }
      // });
    // });
  // }
};
