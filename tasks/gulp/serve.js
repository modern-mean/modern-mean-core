'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import livereload from 'gulp-livereload';
import * as build from './build';

var nodemonInstance;

function start(done) {

  nodemonInstance = nodemon({
    script: './build/core/server/app/server.js',
    watch: ['noop'],
  });
  return done();
}
start.displayName = 'Nodemon Start Server';

function restart(done) {
  nodemonInstance.restart();
  return nodemonInstance.on('start', function () {
    return done();
  });
}
restart.displayName = 'Nodemon Restart Server';

function watchClient(done) {
  livereload.listen();
  gulp.watch(['modules/*/client/**/*.{js,css,html}'], gulp.series(terminalClear, build.client, build.inject, restart, livereloadChanged));
  return done();
}
watchClient.displayName = 'Serve::Watch::Client';

function watchServer(done) {
  gulp.watch(['modules/*/server/**/*.{js,css,html}'], gulp.series(terminalClear, build.server, build.inject, restart, livereloadChanged));
  return done();
}
watchServer.displayName = 'Serve::Watch::Server';




function livereloadChanged(done) {
  setTimeout(function () {
    livereload.changed('Restart Client');
  }, 1000);
  return done();
}
livereloadChanged.displayName = 'Serve::LiveReload::Changed';

function terminalClear(done) {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
  if (done) {
    return done();
  }
}

let watch = {
  all: gulp.parallel(watchClient, watchServer),
  client: watchClient,
  server: watchServer
}

export {
  start,
  restart,
  watch,
  terminalClear as clear
};
