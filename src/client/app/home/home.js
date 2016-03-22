"use strict";
angular.module('home', [])
.controller('HomeController', function($scope, RequestFactory, AuthFactory, $cookies){
  $scope.empty = false;
  $scope.loading = true;

  var initializeDashboardList = function() {
    var githubId = $cookies.get('githubId');
    RequestFactory.getAllDashboards(githubId)
    .then(function (dashboards) {
      $scope.loading = false;
      $scope.dashboards = dashboards;
      if (dashboards.length === 0) {
        $scope.empty = true;
      }
    });
  };

  initializeDashboardList();
});
