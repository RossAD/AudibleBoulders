"use strict";
angular.module('home', [])
.controller('HomeController', function($scope, RequestFactory, AuthFactory, $cookies){
  var initializeDashboardList = function() {
    var githubId = $cookies.get('githubId');
    RequestFactory.getAllDashboards(githubId)
    .then(function (dashboards) {
      $scope.dashboards = dashboards;
    });
  };
  initializeDashboardList();
});
