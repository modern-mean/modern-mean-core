var gulp = require('gulp'),
  KarmaServer = require('karma').Server;

// Karma test runner task
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
