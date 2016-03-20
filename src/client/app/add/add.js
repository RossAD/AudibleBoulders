"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', '$window', 'RequestFactory', '$http',function($scope, $window, RequestFactory, $http){
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
