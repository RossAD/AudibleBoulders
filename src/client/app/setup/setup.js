"use strict";
angular.module('setup', [])
.controller('SetupController', ['$scope', '$window', 'RequestFactory', '$location', '$routeParams', '$cookies', function($scope, $window, RequestFactory, $location, $routeParams, $cookies){
  console.log('SetupController');
  var orgName = $routeParams.orgName;
  var repoName = $routeParams.repoName;
  var githubId = $cookies.get('githubId');
  RequestFactory.getSetupInfo(orgName, repoName, githubId)
  .then(function (setupInfo) {
    $scope.users_id = setupInfo.users_id;
    $scope.dashboards_id = setupInfo.dashboards_id;
  });
}]);
