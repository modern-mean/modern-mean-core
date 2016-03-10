var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload')
  build = require('./build');

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

function watch(done) {
  livereload.listen();
  gulp.watch(['modules/**/*.{js,css,html}'], gulp.series(build.build, restart, livereloadChanged));
  return done();
}

function livereloadChanged(done) {
  setTimeout(function () {
    livereload.changed('Restart Client');
  }, 1000);
  return done();
}

module.exports = {
  start: start,
  restart: restart,
  watch: watch
};
