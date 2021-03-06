"use strict";
angular.module('GitSpy', [
  'add',
  'about',
  'dashboard',
  'home',
  'login',
  'setup',
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngAnimate',
  'helper',
  'logout',
  'btford.socket-io'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/home/home.html',
    controller: 'HomeController'
  });
  $routeProvider.when('/login', {
    templateUrl: '/app/login/login.html',
    controller: 'LoginController'
  });
  $routeProvider.when('/add', {
    templateUrl: '/app/add/add.html',
    controller: 'AddController'
  });
  $routeProvider.when('/about', {
    templateUrl: '/app/about/about.html',
    controller: 'AboutController'
  });
  $routeProvider.when('/learn-more', {
    templateUrl: '/app/about/learn-more.html',
    controller: 'AboutController'
  });
  $routeProvider.when('/:orgName/:repoName', {
    templateUrl: '/app/dashboard/dashboard.html',
    controller: 'DashboardController'
  });
  $routeProvider.when('/:orgName/:repoName/setup', {
    templateUrl: '/app/setup/setup.html',
    controller: 'SetupController'
  });
  $routeProvider.when('/logout', {
    templateUrl: '/app/logout/logout.html',
    controller: 'LogoutController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}])

.run(function($rootScope, $location, AuthFactory, Socket) {
  $rootScope.$on('$routeChangeStart', function(event, toState) {
    // Socket.emit('leaveRooms', {});
    var route = toState.originalPath;
    if (AuthFactory.authRoutes.indexOf(route) >= 0 && !AuthFactory.isAuth()) {
      $location.path('/login');
    }

  });
})
.directive('targetTab', function(){
  return {
    compile: function(element){
      var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
      elems.attr("target", "_blank");
    }
  };
});
