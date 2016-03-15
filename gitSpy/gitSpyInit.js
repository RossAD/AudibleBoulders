var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

function createFile(path, content) {
  if (!fs.existsSync(path)) {
    var file = fs.openSync(path, 'w');
    fs.writeFileSync(path, content);
    fs.closeSync(file);
  }
}

var postCommitPath = './.git/hooks/post-commit';
// var postMergePath = '../.git/hooks/post-merge';
var runGitSpy = '#!/bin/sh\nnode gitSpy/gitSpy.js';
// var updateGitSpy = '#!/bin/sh\n gitSpy/updateGitSpy.js'

/** Create post-commit and post-merge scripts **/
createFile(postCommitPath, runGitSpy);
// createFile(postMergePath, updateGitSpy);

/** Make files executable **/
spawnSync('chmod', ['+x', '.git/hooks/post-commit']);
// spawnSync('chmod', ['+x', '.git/hooks/post-merge']);