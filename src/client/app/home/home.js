"use strict";
angular.module('home', [])
.controller('HomeController', function($scope, $window, RequestFactory){
  var initializeDashboardList = function() {
    RequestFactory.getAllDashboards(1) // userId hardcoded to 1 for now
    .then(function (dashboards) {
      $scope.dashboards = dashboards;
    });
  };
  initializeDashboardList();
});
