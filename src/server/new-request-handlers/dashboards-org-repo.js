/*jshint loopfunc: true */
"use strict";

var request = require('request');
var pool = require('../db/index.js');

// This request handler takes the orgname and reponame for a given dashboard and returns everything
// needed to render that dashboard page
//
// Example response object:
//
// {
//   dashboard: {
//     id: 1,
//     last_commit_sha1: 'some_git_sha1_sdfasdsdfsdff',
//     last_commit_msg: 'Merged pull request #27 etc etc'
//   },
//   users: [
//     {
//       github_id: 1,
//       github_handle: 'yaliceme',
//       github_name: 'Alice Yu',
//       github_avatar: 'profile.jpg',
//       set_up: 1,
//       last_pulled_commit_sha1: 'some_sha1_hash_sdfdsfasd',
//       last_pulled_commit_msg: 'Merged pull request #26 etc etc',
//       diffs: [
//         { file: 'file/path/index.html',
//           mod_type: 'deleted'
//         }
//       ]
//     }
//   ]
// }

module.exports = {
  handleGet: function (req, res, next) {
    var responseObject = {dashboard: {}, users: []};
    var githubId = req.cookies.githubId;
    var orgName = req.params.orgName;
    var repoName = req.params.repoName;

    // update last commit to what's current at github.com
    // get dashboard info and attach it to responseObject
    // get users info and store it in a temp array
    // iterate through the array and get diffs info for each user
    // push user info into users array
    // send responseObject once all users are in


  }
};
