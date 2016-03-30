/*jshint loopfunc: true */
"use strict";

var dashboards = require('../queries/dashboards');
var users_dashboards = require('../queries/users_dashboards');
var users = require('../queries/users');
var diffs = require('../queries/diffs');
var github = require('../queries/github');

module.exports = {
  handleGet: function (req, res, next) {
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
    var responseObject = {dashboard: {}, users: []};

    var githubId = req.cookies.githubId;
    var orgName = req.params.orgName;
    var repoName = req.params.repoName;

    // commitUrl hardcoded for master branch for now
    var commitUrl = 'https://api.github.com/repos/' + orgName + '/' + repoName + '/commits/master';

    // first check if dashboard exists
    dashboards.getOneAsync(orgName, repoName)
      .then(function (dashboard) {
        if (!dashboard) {
          res.sendStatus(400);
        } else {
          responseObject.dashboard.id = dashboard.id;
          // next check if this user is authorized to view this dashboard
          users_dashboards.getOneAsync(githubId, dashboard.id)
            .then(function (recordObject) {
              if (!recordObject) {
                res.sendStatus(400);
              } else {
                // query github with user token to update last_commit
                users.getOneAsync(githubId)
                  .then(function (user) {
                    var userToken = user.github_token;
                    return github.queryAsync(commitUrl, userToken);
                  })
                  .then(function (commit) {
                    var parseCommit = JSON.parse(commit.body);
                    var commitSha1 = parseCommit.sha;
                    // only use the first line of the commit message
                    var commitMsg;
                    if (parseCommit.commit.message.indexOf('\n') === -1) {
                      commitMsg = parseCommit.commit.message;
                    } else {
                      commitMsg = parseCommit.commit.message.substring(0, parseCommit.commit.message.indexOf('\n'));
                    }
                    return dashboards.updateLastCommitAsync(orgName, repoName, commitSha1, commitMsg);
                  })
                  // attach full dashboard data to responseObject
                  .then(function () {
                    return dashboards.getOneAsync(orgName, repoName);
                  })
                  .then(function (dashboard) {
                    responseObject.dashboard.last_commit_sha1 = dashboard.last_commit_sha1;
                    responseObject.dashboard.last_commit_msg = dashboard.last_commit_msg;
                    // get all users belonging to this dashboard
                    return users.getDashboardUsersAsync(responseObject.dashboard.id);
                  })
                  .then(function (dashboardUsers) {
                    var usersWithSigHashes = dashboardUsers;
                    // get diffs for each user
                    usersWithSigHashes.forEach(function (thisUser) {
                      diffs.getAllAsync(thisUser.signature_hash)
                        .then(function (diffsArray) {
                          responseObject.users.push({
                            github_id: thisUser.github_id,
                            github_handle: thisUser.github_handle,
                            github_name: thisUser.github_name,
                            github_avatar: thisUser.github_avatar,
                            set_up: thisUser.set_up,
                            last_pulled_commit_sha1: thisUser.last_pulled_commit_sha1,
                            last_pulled_commit_msg: thisUser.last_pulled_commit_msg,
                            diffs: diffsArray
                          });
                          if (responseObject.users.length === usersWithSigHashes.length) {
                            res.json(responseObject);
                          }
                        });
                    });
                  })
                  .catch(function (e) {
                    console.error(e);
                    res.sendStatus(500);
                  });
              }
            })
            .catch(function (e) {
              console.error(e);
              res.sendStatus(500);
            });
        }
      })
      .catch(function (e) {
        console.error(e);
        res.sendStatus(500);
      });
  }
};
