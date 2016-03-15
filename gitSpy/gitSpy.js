// var ImageToAscii = require('image-to-ascii');
var spawnSync = require('child_process').spawnSync;
var keys = require('./USER_KEYS');

function parseHash(commit) {
  var HASH_LENGTH = 40;
  return commit.substring(commit.length - HASH_LENGTH);
}

function runChildProcess(command, args, stdoutFormat) {
  var stringifiedArgs = [];
  for (var i = 0; i < args.length; i++) {
    var strArg = typeof args[i] === 'string' ? args[i] : JSON.stringify(args[i]);
    stringifiedArgs.push(strArg);
  }
  return spawnSync(command, stringifiedArgs, {encoding: stdoutFormat});
}

function getLastPullHash(gitLog) {
  for (var i = 0; i < gitLog.length; i++) {
    var commit = gitLog[i];
    if (commit.indexOf('Merge pull request ') === 0 || commit.indexOf('Initial commit') === 0) {
      return parseHash(commit);
    }
  }
  console.log("Error: cannot find most recent pull or initial git commit");
}

function formatDiffs(gitDiff) {
  var diffs = [];
  for (var i = 0; i < gitDiff.length - 1; i++) {
    var diff = gitDiff[i];
    diffs.push({"mod_type": diff.substring(0, 1), "file": diff.substring(2)});
  }
  return diffs;
}

/** Parse most recent commit hash and pull hash from git log **/
var gitLog = runChildProcess('git', ['log', '--pretty=format:%s %H'], 'utf-8').stdout.split('\n');
var commitHash = parseHash(gitLog[0]);
var lastPullHash = getLastPullHash(gitLog);

/** Parse and format all diffs since last merge **/
var gitDiff = runChildProcess('git', ['diff', '--name-status', lastPullHash, commitHash], 'utf-8').stdout.split('\n');
var diffs = formatDiffs(gitDiff);

/** send POST request to server **/
var data = {
  users_id: "users_id", // TODO REPLACE WITH keys.user_id
  projects_id: "projects_id", // TODO REPLACE WITH keys.project_id
  last_pulled_commit: lastPullHash,
  diffs: diffs
};
runChildProcess('curl',
  ['-X', 'POST', '-H', 'Content-Type: application/json', '-d', data, 'http://localhost:8080/api/commits'],
  'utf-8');

/** console log cute ascii art **/
// ImageToAscii('https://s-media-cache-ak0.pinimg.com/236x/2d/8e/e8/2d8ee815146390d567706f2c7b5c2916.jpg', function(err, converted) {
//     console.log(err || converted);
// });