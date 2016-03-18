module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // testing frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser. order matters!
    files: [
      // angular source
      'src/client/lib/angular/angular.js',
      'src/client/lib/angular-route/angular-route.js',
      'src/client/lib/angular-mocks/angular-mocks.js',
      'src/client/lib/angular-cookies/angular-cookies.js',

      // our app code
      'src/client/app/**/*.js',

      // our spec files - in order of the README
      'specs/client/routingSpec.js',
      'specs/client/servicesSpec.js',
      'specs/client/homeControllerSpec.js',
      'specs/client/addControllerSpec.js',
      'specs/client/dashboardControllerSpec.js',
      'specs/client/setupControllerSpec.js'
    ],

    // test results reporter to use
    reporters: ['nyan'],

    colors: true,

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true

  });
};

