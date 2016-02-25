var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  KarmaServer = require('karma').Server,
  argv = require('yargs').argv,
  coverage = require('gulp-coverage'),
  mocha = require('gulp-mocha'),
  concat = require('gulp-concat'),
  coveralls = require('gulp-coveralls');


function lint() {
  return gulp.src(['modules/**/*.js'])
    //.pipe(jshint())
    //.pipe(jshint.reporter('default'))
    //.pipe(jshint.reporter('fail'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'lint';

function karmaSingle(done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, function() {
        done();
    }).start();
}
karmaSingle.displayName = 'karma';

function karmaWatch(done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    autoWatch: true
  }, function() {
        done();
    }).start();
}
karmaWatch.displayName = 'karmaWatch';


function mochaTest(done) {
  return done(); //TODO remove when I figure out server side testing.
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
      .pipe(coverage.format([{ reporter: 'lcov', outFile: 'lcov.info' }, { type: 'html', subdir: 'report-html' }]))
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
  client: {
    single: karmaSingle,
    watch: karmaWatch
  },
  coveralls: sendCoveralls,
  lint: lint,
  server: mochaTest
};
