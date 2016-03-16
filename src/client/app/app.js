"use strict";
angular.module('myApp', [
  'add', 'dashboard', 'home', 'login', 'ngRoute', 'helper'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/home/home.html',
    controller: 'HomeController'
  });
  $routeProvider.when('/login',{
    templateUrl: 'app/login/login.html',
    controller: 'LoginController'
  });
  $routeProvider.when('/add', {
    templateUrl: 'app/add/add.html',
    controller: 'AddCongtroller'
  });
  $routeProvider.when('/dashboard/:orgName/:repoName', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: 'DashboardController'
  });
  $routeProvider.when('/setup/:orgName/:repoName', {
    templateUrl: 'app/setup/setup.html',
    controller: 'SetupController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);