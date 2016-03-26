"use strict";
angular.module('setup', [])
.controller('SetupController', ['$scope', '$window', 'RequestFactory', '$location', '$routeParams', '$cookies', function($scope, $window, RequestFactory, $location, $routeParams, $cookies){
  console.log('SetupController');
  var dashboardId = $routeParams.dashboardId;
  var githubId = $cookies.get('githubId');
  RequestFactory.getSetupInfo(dashboardId, githubId)
  .then(function (setupInfo) {
    $scope.org_name = setupInfo.org_name;
    $scope.repo_name = setupInfo.repo_name;
    $scope.signature_hash = setupInfo.signature_hash;
  });
}]);
