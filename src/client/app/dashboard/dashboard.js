"use strict";
angular.module('dashboard', [])
.controller('DashboardController', function ($scope, $routeParams, RequestFactory, Socket) {
  $scope.dashboard = [];
  $scope.users = [];

  Socket.on('newUser', function (data) {
    // $scope.users.push(data);
  });

  Socket.on('updateDiffs', function (data) {
    // $scope.users[data.users_id].diffs.push(data);
  });

  $scope.getDashboard = function () {
    var orgName = $routeParams.orgName;
    var repoName = $routeParams.repoName;
    RequestFactory.getDashboard(orgName, repoName)
    .then(function (data) {
      $scope.users = data.users;
      $scope.dashboard = data.dashboard;
    });
  };

  $scope.getDashboard();
});
