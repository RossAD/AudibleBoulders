"use strict";
angular.module('home', [])
.controller('HomeController', function($scope, RequestFactory, AuthFactory, $cookies, Socket){
  $scope.empty = false;
  $scope.loading = true;
  var githubId = $cookies.get('githubId');
  var isEmpty = function() {
    if ($scope.dashboards.length === 0) {
        $scope.empty = true;
    }
  };

  var emitRemovedDash = function (dashboard) {
    console.log('emitRemovedDash called, removing: ', dashboard);
    Socket.emit('removeDash', dashboard);
  };

  $scope.removeUserDashboard = function(index) {
    var dashboardId = $scope.dashboards[index].id;
    console.log('dashboards in remove: ', $scope.dashboards);
    $scope.dashboards.splice(index, 1);
    isEmpty();
    RequestFactory.deleteUserDashboard(githubId, dashboardId)
    .then(function () {
      console.log('Attempting to remove with sockets... ');
      emitRemovedDash({githubId: githubId, dashboardId: dashboardId});
    });
  };

  var initializeDashboardList = function() {
    RequestFactory.getAllDashboards(githubId)
    .then(function (dashboards) {
      $scope.loading = false;
      $scope.dashboards = dashboards;
      isEmpty();
    });
  };

  initializeDashboardList();
});
