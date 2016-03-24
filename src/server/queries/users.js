"use strict";

var pool = require('../db/index.js');

module.exports = {
  // NOTE: by "return", we really mean "pass to callback as results arg"

  getOne: function (githubId, callback) {
    // return user object (with all fields) or null if none
  },
  getDashboardUsers: function (dashboardId, callback) {
    // do a join between users_dashboards and users, where users_dashboards.dashboards_id matches dashboardId
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
  },
  updateToken: function (githubId, newToken, callback) {
    // update token
    // no return value
  },
  findOrCreate: function (githubId, callback) {
    // return token and some kind of bool for whether it was a find or create
  }
};
