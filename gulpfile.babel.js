'use strict';

import gulp from 'gulp';
import * as build from './tasks/gulp/build';
import * as serve from './tasks/gulp/serve';
import * as test from './tasks/gulp/test';


function setDevelopment(done) {
  console.log(process.env.NODE_PATH);
  process.env.NODE_ENV = 'development';
  return done();
}

function setTest(done) {
  process.env.NODE_ENV = 'test';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  return done();
}

//Gulp Default
var defaultTask = gulp.series(build.clean, setDevelopment, build.build, serve.start, serve.watch.all);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Gulp test
var preTest = gulp.parallel(build.clean, setTest, test.lint);
var testTask = gulp.series(preTest, build.build, test.client.single, test.server.single, test.coveralls);
testTask.displayName = 'test';
gulp.task(testTask);

//Gulp test:server
var testServerTask = gulp.series(build.clean, setTest, build.config, test.server.watch);
testServerTask.displayName = 'test:server';
gulp.task(testServerTask);

//Gulp test:client
var testClientTask = gulp.series(build.clean, setTest, build.build, test.client.watch);
testClientTask.displayName = 'test:client';
gulp.task(testClientTask);

//Lint test
var lint = gulp.series(setTest, test.lint);
lint.displayName = 'lint';
gulp.task(lint);
