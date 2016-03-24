"use strict";

var pool = require('../db/index.js');

module.exports = {
  // NOTE: by "return", we really mean "pass to callback as results arg"

  getOne: function (orgName, repoName, callback) {
    // return dashboard object (with all fields) or null if none
  },
  getAll: function (githubId, callback) {
    // return an array of all dashboard objects (with all fields) associated with github_id
  },
  updateLastCommit: function (newSha1, newMsg, orgName, repoName, callback) {
    // no return value
  },
  findOrCreate: function (orgName, repoName, callback) {
    // return id and a bool for whether it was a find or a create
  }
};
