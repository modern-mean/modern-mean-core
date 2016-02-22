var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

// Nodemon task
gulp.task('nodemon', function () {
  return nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: ['modules/**/*'],
    tasks: ['build']
  });
});
