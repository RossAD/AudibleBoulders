"use strict";
angular.module('dashboard', [])
.controller('DashboardController', function ($scope, $routeParams, RequestFactory, Socket) {
  $scope.orgName = $routeParams.orgName;
  $scope.repoName = $routeParams.repoName;
  $scope.repoLink = 'https://github.com/' + $routeParams.orgName + '/' + $routeParams.repoName;
  $scope.loading = true;
  $scope.modified = false;
  $scope.added = false;
  $scope.removed = false;
  $scope.storage = {};

  $scope.conflicts = [];
  // example $scope.conflicts
  // ========================
  // $scope.conflicts = [
  //   { file: 'test1.js',
  //     users: [
  //       { github_handle: 'yaliceme',
  //         github_name: 'Alice Yu',
  //         mod_type: 'M'
  //       },
  //       { github_handle: 'rhombus',
  //         github_name: 'Diamond Wheeler',
  //         mod_type: 'M'
  //       }
  //     ]
  //   },
  //   { file: 'test2.js',
  //     users: [
  //       { github_handle: 'alberthyunh',
  //         github_name: 'Albert Hyunh',
  //         mod_type: 'M'
  //       },
  //       { github_handle: 'rossad',
  //           github_name: 'Ross Davis',
  //           mod_type: 'M'
  //       }
  //     ]
  //   }
  // ];

  var parseConflicts = function () {
    var fileMap = {};
    // example fileMap
    // ===============
    // fileMap = {
    //   test1.js: [
    //     { github_handle: 'yaliceme',
    //       github_name: 'Alice Yu',
    //       mod_type: 'M'
    //     },
    //     { github_handle: 'rhombus',
    //       github_name: 'Diamond Wheeler',
    //       mod_type: 'M'
    //     }
    //   ]
    // };
    var users = $scope.users;
    var dashboard = $scope.dashboard;

    for (var i = 0; i < users.length; i++) {
      var thisUser = users[i];
      if (thisUser.last_pulled_commit_sha1 === dashboard.last_commit_sha1) {
        // thisUser is up to date (green), so add their affected files to fileMap
        var theseDiffs = thisUser.diffs;
        for (var j = 0; j < theseDiffs.length; j++) {
          var thisDiff = theseDiffs[j];
          if (!fileMap[thisDiff.file]) {
            fileMap[thisDiff.file] = [];
          }
          fileMap[thisDiff.file].push({
            github_handle: thisUser.github_handle,
            github_name: thisUser.github_name,
            mod_type: thisDiff.mod_type
          });
        }
      }
    }

    for (var file in fileMap) {
      if (fileMap[file].length > 1) {
        // file is being affected by multiple people -> potential conflict
        $scope.conflicts.push({
          file: file,
          users: fileMap[file]
        });
      }
    }
  };

  Socket.on('newUser', function (data) {
    // $scope.users.push(data);
  });

  Socket.on('updateDiffs', function (data) {
    // $scope.users[data.users_id].diffs.push(data);
  });

  $scope.hasModified = function (diffs) {
    for (var i = 0; i < diffs.length; i++) {
      if (diffs[i].mod_type === 'M') {
        return true;
      }
    }
    return false;
  };

  $scope.hasAdded = function (diffs) {
    for (var i = 0; i < diffs.length; i++) {
      if (diffs[i].mod_type === 'A') {
        return true;
      }
    }
    return false;
  };

  $scope.hasDeleted = function (diffs) {
    for (var i = 0; i < diffs.length; i++) {
      if (diffs[i].mod_type === 'D') {
        return true;
      }
    }
    return false;
  };

  $scope.getDashboard = function () {
    var orgName = $routeParams.orgName;
    var repoName = $routeParams.repoName;
    RequestFactory.getDashboard(orgName, repoName)
    .then(function (data) {
      $scope.loading = false;
      $scope.users = data.users;
      $scope.dashboard = data.dashboard;
      parseConflicts();
    });
  };

  $scope.getDashboard();
});
