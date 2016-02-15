var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  argv = require('yargs').argv,
  testAssets = require('../../config/assets/test');

// Mocha tests task
gulp.task('mocha', function (done) {
  // Open mongoose connections
  var mongoose = require('../../config/lib/mongoose.js');
  var testSuites = Array.isArray(argv.changedTestFiles) && argv.changedTestFiles.length ? argv.changedTestFiles : testAssets.tests.server;
  var error;

  // Connect mongoose
  mongoose.connect(function () {
    mongoose.loadModels();
    // Run the tests
    gulp.src(testSuites)
      .pipe(plugins.coverage.instrument({
        pattern: ['modules/*/server/**/*.js']
      }))
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .on('error', function (err) {
        // If an error occurs, save it
        error = err;
      })
      .on('end', function () {
        // When the tests are done, disconnect mongoose and pass the error state back to gulp
        mongoose.disconnect(function () {
          done(error);
        });
      })
      .pipe(plugins.coverage.gather())
      .pipe(plugins.coverage.format({ reporter: 'lcov', outFile: 'lcov.info' }))
      .pipe(gulp.dest('.coverdata/server'));
  });
});
