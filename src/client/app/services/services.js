"use strict";
var helper = angular.module("helper", ['ngCookies']);

// all GET requests will return res.data in a promise
// POST request does not return anything
helper.factory('RequestFactory', function($http) {
  var getDashboard = function(orgName, repoName) {
    return $http({
      method: 'GET',
      url: '/api/dashboards/' + orgName + '/' + repoName
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getAllDashboards = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/dashboards/' + userId
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getSignature = function(userId, dashboardId) {
    return $http({
      method: 'GET',
      url: '/api/setup/' + userId + '/' + dashboardId
    })
    .then(function(res) {
      return res.data;
    });
  };

  var postDashboard = function(newDashboard) {
    $http({
      method: 'POST',
      url: '/api/dashboards/',
      data: newDashboard
    });
  };

  return {
    getDashboard: getDashboard,
    getAllDashboards: getAllDashboards,
    getSignature: getSignature,
    postDashboard: postDashboard
  };
});

helper.factory('AuthFactory', function($cookies, $http, $location) {
  var authRoutes = ['/', '/add', '/:orgName/:repoName', '/:orgName/:repoName/setup'];

  var isAuth = function () {
    return $cookies.get('githubId');
  };

  var eatCookies = function () {
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) {
      $cookies.remove(k);
    });
  };

  var logout = function() {
    $http({
      method: 'GET',
      url: '/logout'
    });
    $location.path('/login');
  };

  return {
    authRoutes: authRoutes,
    isAuth: isAuth,
    eatCookies: eatCookies,
    logout: logout
  };
});