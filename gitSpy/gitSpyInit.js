var fs = require('fs');

var postCommitPath = './.git/hooks/post-commit';
// var postMergePath = '../.git/hooks/post-merge';
var runGitSpy = '#!/bin/sh\nnode gitSpy/gitSpy.js';

if (!fs.existsSync(postCommitPath)) {
  var postCommit = fs.openSync(postCommitPath, 'w');
  fs.writeFileSync(postCommitPath, runGitSpy);
  fs.closeSync(postCommit);
}

// if (!fs.existsSync(postMergePath)) {
//   var postMerge = fs.openSync(postMergePath, 'w');
//   fs.writeFileSync(postMergePath, 'hello world');
//   fs.closeSync(postMerge);
// }