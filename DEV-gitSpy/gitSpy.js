// var ImageToAscii = require('image-to-ascii');
var spawnSync = require('child_process').spawnSync;
var key = require('./SIGNATURE_HASH');
var HASH_LENGTH = 40;
var error = false;

function parseHash(commit) {
  return commit.substring(commit.length - HASH_LENGTH);
}

function parseMessage(commit) {
  var newLineIndex = commit.indexOf('\t');
  var endOfFirstLineIndex = newLineIndex !== -1 ? newLineIndex : commit.length - HASH_LENGTH;
  return commit.substring(0, endOfFirstLineIndex);
}

function getLastPull(gitLog) {
  var results = {};
  for (var i = 0; i < gitLog.length; i++) {
    var commit = gitLog[i];
    if (commit.indexOf('Merge pull request ') === 0 ||
      commit.indexOf('Initial commit') === 0) {
      results.sha1 = parseHash(commit);
      results.msg = parseMessage(commit);
      return results;
    }
  }
  // set error to true and console error if there is not an initial commit or recent PR
  error = true;
  console.log("Error: cannot find most recent pull or initial git commit");
}

function formatDiffs(gitDiff) {
  var diffs = [];
  for (var i = 0; i < gitDiff.length - 1; i++) {
    var diff = gitDiff[i];
    diffs.push({
      "mod_type": diff.substring(0, 1),
      "file": diff.substring(2)
    });
  }
  return diffs;
}

function getBranch(gitBranch) {
  for (var i = 0; i < gitBranch.length; i++) {
    var branch = gitBranch[i];
    if (branch.indexOf('* ') !== -1) {
      return branch.substring(2);
    }
  }
}

function main() {
  /** SERVE ERROR IF KEY ARE NOT NUMBERS **/
  if (key.signature_hash === "YOUR SIGNATURE_HASH HERE") {
    // set error to true and console error if there is not an initial commit or recent PR
    error = true;
    console.log("Error: Please input your gitSpy signature_hash!");
  }

  /** Parse most recent commit hash and pull hash from git log **/
  var gitLog = spawnSync('git', ['log', '--pretty=format:%s %H'],
    {encoding: 'utf-8'}).stdout.split('\n');
  var commitHash = parseHash(gitLog[0]);
  var lastPull = getLastPull(gitLog);
  // console.log(JSON.stringify(gitLog[23]));

  /** Parse and format all diffs since last merge **/
  var gitDiff = spawnSync('git',
    ['diff', '--name-status', lastPull.sha1, commitHash],
    {encoding: 'utf-8'}).stdout.split('\n');
  var diffs = formatDiffs(gitDiff);

  /** Get local working branch **/
  var gitBranch = spawnSync('git', ['branch'],
    {encoding: 'utf-8'}).stdout.split('\n');
  var commitBranch = getBranch(gitBranch);

  /** send POST request to server **/
  var data = {
    last_pulled_commit_sha1: lastPull.sha1,
    last_pulled_commit_msg: lastPull.msg,
    signature_hash: key.signature_hash,
    commit_branch: commitBranch,
    diffs: diffs
  };
  data = JSON.stringify(data);
  if (!error) {
    spawnSync('curl',
      ['-X', 'POST', '-H', 'Content-Type: application/json', '-d',
        data, 'http://www.gitspy.com/api/commits'],
      {encoding: 'utf-8'});
  }

  /** console log cute ascii art **/
  // ImageToAscii('https://s-media-cache-ak0.pinimg.com/236x/2d/8e/e8/2d8ee815146390d567706f2c7b5c2916.jpg', function(err, converted) {
  //     console.log(err || converted);
  // });
}
main();
