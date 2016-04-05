import lodash from 'lodash';
import { mergeEnvironment } from './config/config.js';

let config = mergeEnvironment();

let karmaReporters = ['progress'];
karmaReporters.push('coverage');

// Karma configuration
module.exports = function (karmaConfig) {
  let karmaFiles = [];

  karmaFiles.push('public/dist/angular.js');
  karmaFiles.push('bower_components/angular-mocks/angular-mocks.js');
  karmaFiles.push('bower_components/angular-material/angular-material-mocks.js');
  karmaFiles = lodash.union(karmaFiles, config.files.test.client.coverage, config.files.test.client.tests);
  karmaFiles.push('public/dist/vendor.js');
  karmaFiles.push('public/dist/templates.js');
  //karmaFiles.push('modules/core/client/app/core.client.app.loader.js');
  //karmaFiles.push('modules/core/client/app/core.client.app.loader.spec.js');
  //console.log('Karma::Files', karmaFiles);

  karmaConfig.set({
    client: {
      captureConsole: false,
    },

    // Frameworks to use
    frameworks: ['mocha', 'chai', 'sinon-chai', 'sinon'],

    preprocessors: {
      'modules/*/client/views/**/*.html': ['ng-html2js'],
      'modules/*/client/**/*.js': ['coverage']
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
      dir: '.coverdata/client',
      reporters: [
        // Reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
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

    customContextFile: 'karma.context.html'


  });
};
