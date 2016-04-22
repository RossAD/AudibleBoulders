"use strict";
var helper = angular.module("helper", []);

// all GET/POST requests will return res.data in a promise
// DELETE request does not return anything
helper.factory('RequestFactory', function($http, $location) {
  var getRepos = function(callback){
    $http({
      method: 'GET',
      url: '/api/repos'
    }).then(function(res){
      callback(res);
    })
    .catch(function(e) {
      $location.path('/logout');
    });
  };

  var getPage = function(url, callback){
    $http({
      method: 'POST',
      url: '/api/repos',
      data: url
    }).then(function(res){
      callback(res);
    })
    .catch(function(e) {
      console.log("Error: ", e);
    });
  };

  var getDashboard = function(orgName, repoName) {
    return $http({
      method: 'GET',
      url: '/api/dashboards/' + orgName + '/' + repoName
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      return null;
    });
  };

  var getAllDashboards = function() {
    return $http({
      method: 'GET',
      url: '/api/dashboards/'
    }).then(function (res) {
      return res.data;
    })
    .catch(function(e) {
      console.log("Error: ", e);
    });
  };

  var getSetupInfo = function(orgName, repoName) {
    return $http({
      method: 'GET',
      url: '/api/setup/' + orgName + '/' + repoName
    }).then(function (res) {
      return res.data;
    })
    .catch(function(e) {
      console.log("Error: ", e);
    });
  };

  var postDashboard = function(dashboardInfo) {
    return $http({
      method: 'POST',
      url: '/api/dashboards/',
      data: dashboardInfo
    }).then(function (res) {
      return res.data;
    })
    .catch(function(e) {
      console.log("Error: ", e);
    });
  };

  var deleteUserDashboard = function(dashboardId) {
    return $http({
      method: 'DELETE',
      url: '/api/dashboards/' + dashboardId
    })
    .catch(function(e) {
      $location.path('/logout');
    });
  };

  return {
    getDashboard: getDashboard,
    getAllDashboards: getAllDashboards,
    getSetupInfo: getSetupInfo,
    postDashboard: postDashboard,
    deleteUserDashboard: deleteUserDashboard,
    getRepos: getRepos,
    getPage: getPage
  };
});

helper.factory('AuthFactory', function($cookies, $http, $location) {
  var authRoutes = ['/', '/add', '/:orgName/:repoName', '/:orgName/:repoName/setup', '/about'];

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

helper.factory('Socket', ['socketFactory', function (socketFactory) {
  return socketFactory();
}]);
