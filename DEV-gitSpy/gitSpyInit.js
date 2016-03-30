var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

var spyUpdate = '/usr/local/bin/spyupdate';
var postReWritePath = './.git/hooks/post-rewrite';
var postCommitPath = './.git/hooks/post-commit';
var runGitSpy = '#!/bin/sh\nnode gitSpy/gitSpy.js';
var runSpyUpdate = '#!/bin/sh\nif [ -a gitSpy/gitSpy.js ]\nthen\nnode gitSpy/gitSpy.js\necho "GitSpy Updated Successfully"\nelse\necho "spyUpdate Does Not Exist in This Folder"\nfi';

function createFile(path, content) {
  if (!fs.existsSync(path)) {
    var file = fs.openSync(path, 'w');
    fs.writeFileSync(path, content);
    fs.closeSync(file);
  }
}

function main() {
/** Create post-rewrite and post-commit scripts **/
  createFile(postCommitPath, runGitSpy);
  createFile(postReWritePath, runGitSpy);
  createFile(spyUpdate, runSpyUpdate);

/** Make files executable **/
  spawnSync('chmod', ['+x', '.git/hooks/post-commit']);
  spawnSync('chmod', ['+x', '.git/hooks/post-rewrite']);
  spawnSync('chmod', ['+xr', '/usr/local/bin/spyupdate']);
  console.log("GitSpy hooks added and spyUpdate executable added ʕ•ᴥ•ʔ");
}
main();
