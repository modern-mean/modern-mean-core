
'use strict';

var gulp = require('gulp'),
  build = require('./tasks/gulp/build'),
  serve = require('./tasks/gulp/serve'),
  test = require('./tasks/gulp/test');

function setDevelopment(done) {
  process.env.NODE_ENV = 'development';
  process.env.NODE_PATH = process.cwd();
  return done();
}

function setTest(done) {
  process.env.NODE_ENV = 'test';
  process.env.NODE_PATH = process.cwd();
  return done();
}


//Gulp Default
var defaultTask = gulp.series(build.clean, setDevelopment, build.build, serve.start, serve.watch);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Gulp test
var preTest = gulp.parallel(build.clean, setTest, test.lint);
var testTask = gulp.series(preTest, build.build, test.client.single, test.server, test.coveralls);
testTask.displayName = 'test';
gulp.task(testTask);

//Gulp test:server
var testServerTask = gulp.series(setTest, test.server);
testServerTask.displayName = 'test:server';
gulp.task(testServerTask);

//Gulp test:client
var testClientTask = gulp.series(setTest, build.build, test.client.watch);
testClientTask.displayName = 'test:client';
gulp.task(testClientTask);

//Lint test
gulp.task(test.lint);
