"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', '$window', 'RequestFactory', '$http',function($scope, $window, RequestFactory, $http, $timeout){
  // Variable to hold returned subscriptions

  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    $scope.subsc = res.data;
  });

  $scope.postDashboard = function (repoObject) {
    RequestFactory.postDashboard(repoObject);
  };
}]);
