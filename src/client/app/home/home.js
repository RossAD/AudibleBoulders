"use strict";
angular.module('home', [])
.controller('HomeController', function($scope, RequestFactory, AuthFactory, $cookies){
  $scope.empty = false;
  $scope.loading = true;
  var githubId = $cookies.get('githubId');
  $scope.removeUserDashboard = function(index) {
    var dashboardId = $scope.dashboards[index].id;
    $scope.dashboards.splice(index, 1);
    RequestFactory.deleteUserDashboard(githubId, dashboardId);
  };
  var initializeDashboardList = function() {
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
