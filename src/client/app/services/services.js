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
      $location.path('/logout');
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

  var getAllDashboards = function(githubId) {
    return $http({
      method: 'GET',
      url: '/api/dashboards/' + githubId
    }).then(function (res) {
      return res.data;
    })
    .catch(function(e) {
      $location.path('/logout');
    });
  };

  var getSetupInfo = function(orgName, repoName, githubId) {
    return $http({
      method: 'GET',
      url: '/api/setup/' + orgName + '/' + repoName + '/' + githubId
    }).then(function (res) {
      return res.data;
    })
    .catch(function(e) {
      $location.path('/logout');
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
      $location.path('/logout');
    });
  };

  var deleteUserDashboard = function(githubId, dashboardId) {
    $http({
      method: 'DELETE',
      url: '/api/users_dashboards/' + githubId + '/' + dashboardId
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

helper.factory('Socket', ['socketFactory', function (socketFactory) {
  return socketFactory();
}]);
