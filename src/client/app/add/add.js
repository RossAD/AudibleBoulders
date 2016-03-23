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
    var linkTest = res.data.headers.link.split(' ');
    var testLink = '<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=15>; rel="next", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel="last", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=1>; rel="first", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=13>; rel="prev"';
    var splitty = testLink.split(' ');
    var regLink = [];
    var pattern = /(<|>;|,|"|rel=)/ig;
    for(var i = 0; i < linkTest.length; i++){
      regLink.push(linkTest[i].replace(pattern, ""));
    }
    console.log('Link: ', regLink);
    $scope.subsc = JSON.parse(res.data.body);
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
