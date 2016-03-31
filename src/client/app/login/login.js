"use strict";
angular.module('login', [])
.controller('LoginController', function($scope, $cookies, $window, $location, RequestFactory){
  $scope.isActivePage = function(viewLocation) {
    $scope.welcomeString = "<span>Welcome, "+$cookies.get('githubName')+"!</span>"; 
    return viewLocation === $location.path();
  };
});
