"use strict";
angular.module('login', [])
.controller('LoginController', function($scope, $cookies,$window, $location, RequestFactory){
  $scope.user = $cookies.get('githubName');
  $scope.isActivePage = function(viewLocation) {
    return viewLocation === $location.path();
  };
});
