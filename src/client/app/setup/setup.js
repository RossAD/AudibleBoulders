"use strict";
angular.module('setup', [])
.controller('SetupController', ['$scope', '$window', 'RequestFactory', '$location', '$routeParams', function($scope, $window, RequestFactory, $location, $routeParams){
  var orgName = $scope.orgName = $routeParams.orgName;
  var repoName = $scope.repoName = $routeParams.repoName;
  RequestFactory.getSetupInfo(orgName, repoName)
  .then(function (setupInfo) {
    $scope.signature_hash = setupInfo.signature_hash;
  });
}]);
