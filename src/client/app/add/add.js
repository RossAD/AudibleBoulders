"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', '$window', 'RequestFactory', '$http',function($scope, $window, RequestFactory, $http, $timeout){
  // Variable to hold returned subscriptions
  $scope.repoAdded = false;
  $scope.newRepo = '';
  var timeOfLastAdd;

  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    $scope.subsc = res.data;
  });
  // Add Repo Message
  var addRepoMessage = function (repo) {
    $scope.newRepo = repo;
    $scope.repoAdded = true;
  };

  var expireRepoMessage = function (milliseconds) {
    setTimeout(function() {
      $scope.$apply(function() {
        if ($scope.repoAdded === true && (Date.now() - timeOfLastAdd >= milliseconds)) {
          $scope.repoAdded = false;
        }
      });
    }, milliseconds);
  };

  $scope.postDashboard = function (repoObject) {
    RequestFactory.postDashboard(repoObject);
    timeOfLastAdd = Date.now();
    addRepoMessage(repoObject.full_name);
    expireRepoMessage(3000);
  };



}]);
