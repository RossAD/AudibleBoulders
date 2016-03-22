"use strict";
angular.module('login', [])
.controller('LoginController', function($scope, $window, $location, RequestFactory){
  console.log('LoginController');

  $scope.isActivePage = function(viewLocation) {
    console.log('isActive ran: ', viewLocation, $location.path());
    return viewLocation === $location.path();
  };
});
