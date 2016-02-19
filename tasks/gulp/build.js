
var gulp = require('gulp'),
  runSequence = require('run-sequence');

// Lint project files and minify them into two production files.
gulp.task('build', function (done) {
  switch (process.env.NODE_ENV) {
    case 'production':
      runSequence('clean:build', ['lint', 'concat', 'templatecache', 'imagemin'], ['uglify', 'cssmin', 'obfuscate'], 'clean:build:src', 'inject', done);
      break;

    case 'test':
      runSequence('clean:build', ['lint', 'concat', 'templatecache', 'imagemin'], 'clean:build:src', 'inject', done);
      break;

    case 'development':
      runSequence('clean:build', ['lint', 'concat', 'templatecache', 'imagemin'], 'inject', done);
      break;

    default:

      break;
  }

});

// Run the project tests
gulp.task('test', function (done) {
  runSequence('clean:coverage', 'env:test', 'build', 'copy:localConfig', 'mocha', 'karma', 'coveralls', done);
});

gulp.task('test:server', function (done) {
  runSequence('env:test', 'lint', 'mocha', done);
});

// Watch all server files for changes & run server tests (test:server) task on changes
// optional arguments:
//    --onlyChanged - optional argument for specifying that only the tests in a changed Server Test file will be run
// example usage: gulp test:server:watch --onlyChanged
gulp.task('test:server:watch', function (done) {
  runSequence('clean:coverage', 'test:server', 'watch', done);
});

gulp.task('test:client', function (done) {
  runSequence('clean:coverage', 'env:test', 'lint:js','build', 'karma', done);
});

gulp.task('test:e2e', function (done) {
  runSequence('clean:coverage', 'env:test', 'dropdb', 'nodemon', 'protractor', done);
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', 'build', 'stripDebug', ['copy:localConfig', 'nodemon', 'watch'], done);
});

// Run the project in debug mode
gulp.task('debug', function (done) {
  runSequence('env:dev', 'build', ['copy:localConfig', 'nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence('env:prod', 'build', 'stripDebug', ['copy:localConfig', 'nodemon', 'watch'], done);
});
