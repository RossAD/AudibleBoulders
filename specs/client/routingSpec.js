'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('GitSpy'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    expect($route.routes['/']).to.be.defined;
    expect($route.routes['/'].controller).to.equal('HomeController');
    expect($route.routes['/'].templateUrl).to.equal('/app/home/home.html');
  });

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].templateUrl).to.equal('/app/login/login.html');
  });

  it('Should have /add route, template, and controller', function () {
    expect($route.routes['/add']).to.be.defined;
    expect($route.routes['/add'].controller).to.equal('AddController');
    expect($route.routes['/add'].templateUrl).to.equal('/app/add/add.html');
  });

  it('Should have /:orgName/:repoName route, template, and controller', function () {
    expect($route.routes['/:orgName/:repoName']).to.be.defined;
    expect($route.routes['/:orgName/:repoName'].controller).to.equal('DashboardController');
    expect($route.routes['/:orgName/:repoName'].templateUrl).to.equal('/app/dashboard/dashboard.html');
  });

  it('Should have /:orgName/:repoName/setup route, template, and controller', function () {
    expect($route.routes['/:orgName/:repoName/setup']).to.be.defined;
    expect($route.routes['/:orgName/:repoName/setup'].controller).to.equal('SetupController');
    expect($route.routes['/:orgName/:repoName/setup'].templateUrl).to.equal('/app/setup/setup.html');
  });

  it('Should have /logout route, template, and controller', function () {
    expect($route.routes['/logout']).to.be.defined;
    expect($route.routes['/logout'].controller).to.equal('LogoutController');
    expect($route.routes['/logout'].templateUrl).to.equal('/app/logout/logout.html');
  });
});
