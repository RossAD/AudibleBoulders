"use strict";
angular.module('setup', [])
.controller('SetupController', ['$scope', '$window', 'RequestFactory', '$location', '$routeParams', '$cookies', function($scope, $window, RequestFactory, $location, $routeParams, $cookies){
  console.log('SetupController');
  var orgName = $scope.orgName = $routeParams.orgName;
  var repoName = $scope.repoName = $routeParams.repoName;
  var githubId = $cookies.get('githubId');
  RequestFactory.getSetupInfo(orgName, repoName, githubId)
  .then(function (setupInfo) {
    $scope.signature_hash = setupInfo.signature_hash;
  });
}]);
