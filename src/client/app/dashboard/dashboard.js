"use strict";
angular.module('dashboard', [])
.controller('DashboardController', function ($scope, $routeParams, RequestFactory) {
  $scope.dashboard = [];

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
