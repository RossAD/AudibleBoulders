"use strict";

var pool = require('../db/index.js');

module.exports = {
  getOne: function (orgName, repoName) {
    // return dashboard object (with all fields) or null if none
  },
  getAll: function (githubId) {
    // return an array of all dashboard objects (with all fields) associated with github_id
  },
  getId: function (orgName, repoName) {
    // return id of dashboard entry with matching org_name, repo_name
  },
  getLastCommitSha1: function (orgName, repoName) {
    // return last_commit_sha1 of dashboard with matching org_name repo_name
  },
  updateLastCommit: function (newSha1, newMsg, orgName, repoName) {
    // no return value
  },
  findOrCreate: function (orgName, repoName) {
    // return id and a bool for whether it was a find or a create
  }
};
