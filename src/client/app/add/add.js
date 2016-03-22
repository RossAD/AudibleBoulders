"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', 'RequestFactory', '$http', 'Socket', '$location',function($scope, RequestFactory, $http, Socket, $location){

  $scope.loading = true;

  // Variable to hold returned subscriptions
  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    $scope.loading = false;
    $scope.subsc = res.data;
  });

  var emitJoinDash = function (repoObject) {
    var dashPath = repoObject.full_name;
    Socket.emit('newJoin', {
    });
    $location.path(dashPath);
  };

  $scope.postDashboard = function (repoObject) {
    RequestFactory.postDashboard(repoObject)
    .then(function () {
      emitJoinDash(repoObject);
    });
  };
}]);
