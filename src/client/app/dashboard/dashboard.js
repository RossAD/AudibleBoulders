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
      console.log('users:', $scope.users);
    });
  };

  $scope.getDashboard();
});
