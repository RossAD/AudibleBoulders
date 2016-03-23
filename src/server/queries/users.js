"use strict";

var pool = require('../db/index.js');

module.exports = {
  getOne: function (githubId) {
    // return bool (we only need to check if user already exists)
    // alternatively, return user record if exists, or null if not
  },
  getDashboardUsers: function (dashboardId) {
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
  getToken: function (githubId) {
    // return token
  },
  updateToken: function (githubId, newToken) {
    // update token
    // no return value
  },
  findOrCreate: function (githubId) {
    // return token and some kind of bool for whether it was a find or create
  }
};
