"use strict";

var pool = require('../db/index.js').getPool();
var promise = require('bluebird');

// NOTE: when using the methods in this module, append "Async" to the end of the method name
var users = module.exports = promise.promisifyAll({
  // NOTE: by "return", we really mean "pass to callback as results arg"

  addOne: function (userObject, callback) {
    // userObject should include properties for all users fields
    pool.query('INSERT INTO users (github_id, github_handle, github_name, github_avatar, github_token) VALUES (?, ?, ?, ?, ?)', [userObject.github_id, userObject.github_handle, userObject.github_name, userObject.github_avatar, userObject.github_token], function (err, results) {
      callback(err, 'User added');
    });
  },
  getOne: function (githubId, callback) {
    // return user object (with all fields) or null if none
    pool.query('SELECT * FROM users WHERE github_id=?', [githubId], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        var userObject = (results && results.length > 0) ? results[0] : null;
        callback(null, userObject);
      }
    });
  },
  getDashboardUsers: function (dashboardId, callback) {
    // do a join between users_dashboards and users
    // get the records for which users_dashboards.dashboards_id matches dashboardId
    // return an array of user objects, where each user object includes properties:
      // github_handle
      // github_name
      // github_avatar
      // set_up
      // last_pulled_commit_sha1
      // last_pulled_commit_msg
      // signature_hash
        // ===> NOTE: dashboards-org-repo.js will need to be implemented slightly differently in the
        // new version of this request handler. We do NOT want to include the signature hash in the
        // responseObject, but we do need it in order to query the diffs table.
        // Recommend storing the results of this query in a separate variable (i.e. not responseObject.users),
        // and adding fields to each user in responseObject.users upon completion of the diffs query
    pool.query('SELECT github_id, github_handle, github_name, github_avatar, set_up, last_pulled_commit_sha1, last_pulled_commit_msg, commit_branch, signature_hash FROM users_dashboards INNER JOIN users ON users_dashboards.users_github_id=users.github_id WHERE dashboards_id=?', [dashboardId], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  updateOne: function (userObject, callback) {
    // userObject should include properties for all users fields
    // no return value
    pool.query('UPDATE users SET github_handle=?, github_name=?, github_avatar=?, github_token=? WHERE github_id=?', [userObject.github_handle, userObject.github_name, userObject.github_avatar, userObject.github_token, userObject.github_id], function (err, results) {
      callback(err, 'User updated');
    });
  },
  updateOrCreate: function (profile, token, callback) {
    // profile and token are what's received from passport
    // sample input for profile: https://api.github.com/user/2690580
    // no return value
    var userObject = {
      github_id: profile.id,
      github_handle: profile.login,
      github_name: profile.name,
      github_avatar: profile.avatar_url,
      github_token: token
    };

    // call getOne to see if user already exists
    users.getOne(userObject.github_id, function (err, result) {
      if (err) {
        callback(err, null);
      } else if (result) {
        // user DOES exist - update user
        users.updateOne(userObject, function (err, result) {
          callback(err, 'User updated');
        });
      } else {
        // user DOES NOT exist - create a new user entry
        users.addOne(userObject, function (err, result) {
          callback(err, 'User added');
        });
      }
    });
  }
});
