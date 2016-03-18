"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', '$window', 'RequestFactory', '$http',function($scope, $window, RequestFactory, $http){
  // Variable to hold returned subscriptions
  $scope.subsc = [];
  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    console.log('Subscriptions?? ', res.data);
    $scope.subsc = res.data;
  });
}]);
