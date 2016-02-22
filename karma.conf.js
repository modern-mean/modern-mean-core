(function() {
  'use strict';

  /**
   * Module dependencies.
   */
  var _ = require('lodash'),
    testConfig = require('./config/env/test'),
    karmaReporters = ['progress'],
    mainBowerFiles = require('main-bower-files');

  if (testConfig.coverage) {
    karmaReporters.push('coverage');
  }

  // Karma configuration
  module.exports = function (karmaConfig) {
    var karmaFiles = [];

    var cwd = process.cwd();
    //console.log('Karma::CWD::' + cwd);

    mainBowerFiles(['**/*.js'], { includeDev: true })
      .forEach(function (file) {
        karmaFiles.push({ pattern: file, watched: false, included: true });
      });
    karmaFiles.push('modules/core/client/app/core.client.app.loader.js');
    karmaFiles.push('modules/*/client/**/*.module.js');
    karmaFiles.push('modules/*/client/**/!(*spec).js');
    karmaFiles.push('modules/*/client/**/*.spec.js');
    karmaFiles.push('public/dist/templates.js');
    //karmaFiles.push('modules/core/client/app/core.client.app.loader.js');
    //karmaFiles.push('modules/core/client/app/core.client.app.loader.spec.js');
    //console.log('Karma::Files', karmaFiles);

    karmaConfig.set({
      client: {
        captureConsole: false,
      },


      // Frameworks to use
      frameworks: ['mocha', 'chai-spies', 'chai'],

      preprocessors: {
        'modules/*/client/views/**/*.html': ['ng-html2js'],
        'modules/*/client/**/!(*spec).js': ['coverage']
      },

      ngHtml2JsPreprocessor: {
        moduleName: 'modernMean',

        cacheIdFromPath: function (filepath) {
          return filepath;
        },
      },

      // List of files / patterns to load in the browser
      files: karmaFiles,

      // Test results reporter to use
      // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
      reporters: karmaReporters,

      // Configure the coverage reporter
      coverageReporter: {
        dir : '.coverdata',
        reporters: [
          // Reporters not supporting the `file` property
          { type: 'lcov', subdir: 'client'},
          // Output coverage to console
          { type: 'text' }
        ],
        instrumenterOptions: {
          istanbul: { noCompact: true }
        }
      },

      // Web server port
      port: 9876,

      // Enable / disable colors in the output (reporters and logs)
      colors: true,

      // Level of logging
      // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
      logLevel: process.env.KARMA_LOG || karmaConfig.LOG_DISABLE,

      // Enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,

      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: ['PhantomJS'],

      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,

      
    });
  };
})();
