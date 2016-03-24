"use strict";

var pool = require('../db/index.js');

module.exports = {
  getOne: function (orgName, repoName) {
    // return dashboard object (with all fields) or null if none
  },
  getAll: function (githubId) {
    // return an array of all dashboard objects (with all fields) associated with github_id
  },
  updateLastCommit: function (newSha1, newMsg, orgName, repoName) {
    // no return value
  },
  findOrCreate: function (orgName, repoName) {
    // return id and a bool for whether it was a find or a create
  }
};
