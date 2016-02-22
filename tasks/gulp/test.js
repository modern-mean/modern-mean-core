var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  eslint = require('gulp-eslint'),
  KarmaServer = require('karma').Server,
  argv = require('yargs').argv,
  coverage = require('gulp-coverage'),
  mocha = require('gulp-mocha'),
  concat = require('gulp-concat'),
  coveralls = require('gulp-coveralls');


function lint() {
  return gulp.src(['modules/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(eslint())
    .pipe(eslint.format());
}
lint.displayName = 'lint';

function karma(done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
}
karma.displayName = 'karma';


function mochaTest(done) {

  // Open mongoose connections
  var mongoose = require('../../config/lib/mongoose.js');
  var testSuites = Array.isArray(argv.changedTestFiles) && argv.changedTestFiles.length ? argv.changedTestFiles : 'modules/*/tests/server/**/*.js';
  var error;

  // Connect mongoose
  return mongoose.connect(function () {
    mongoose.loadModels();
    // Run the tests
    return gulp.src(testSuites)
      .pipe(coverage.instrument({
        pattern: ['modules/*/server/**/*.js']
      }))
      .pipe(mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .pipe(coverage.gather())
      .pipe(coverage.format({ reporter: 'lcov', outFile: 'lcov.info' }))
      .pipe(gulp.dest('.coverdata/server'))
      .once('end', function () {
        return mongoose.disconnect(function () {
          return done();
        });
      });
  });
}

function sendCoveralls(done) {
  if (!process.env.CI) return done();
  return gulp.src('.coverdata/**/lcov.info')
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}


module.exports = {
  client: karma,
  coveralls: sendCoveralls,
  lint: lint,
  server: mochaTest
};
