"use strict";
angular.module('login', [])
.controller('LoginController', function($scope, $window, $location, RequestFactory){

  $scope.isActivePage = function(viewLocation) {
    return viewLocation === $location.path();
  };
});
