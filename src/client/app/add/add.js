"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', 'RequestFactory', '$http', 'Socket', '$location',function($scope, RequestFactory, $http, Socket, $location){
  // Variable to hold returned subscriptions
  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    $scope.subsc = res.data;
  });

  var emitJoinDash = function (dashPath, res) {
    Socket.emit('newJoin', {
      users_id: res[0].users_id,
      dashboards_id: res[0].dashboards_id
    });
    $location.path(dashPath);
  };

  $scope.postDashboard = function (repoObject) {
    RequestFactory.postDashboard(repoObject)
    .then(function (res) {
      var dashPath = repoObject.full_name;
      emitJoinDash(dashPath, res);
    });
  };
}]);
