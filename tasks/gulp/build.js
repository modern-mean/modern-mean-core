
var gulp = require('gulp'),
  runSequence = require('run-sequence');

// Lint project files and minify them into two production files.
gulp.task('build', function (done) {
  runSequence('lint', ['uglify', 'cssmin'], done);
});

// Run the project tests
gulp.task('test', function (done) {
  runSequence('clean:coverage', 'env:test', 'copy:localConfig', 'lint', 'mocha', 'karma', 'coveralls', 'nodemon', 'protractor', done);
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
  runSequence('clean:coverage', 'env:test', 'lint', 'karma', done);
});

gulp.task('test:e2e', function (done) {
  runSequence('clean:coverage', 'env:test', 'lint', 'dropdb', 'nodemon', 'protractor', done);
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', 'lint', ['copy:localConfig', 'nodemon', 'watch'], done);
});

// Run the project in debug mode
gulp.task('debug', function (done) {
  runSequence('env:dev', 'lint', ['copy:localConfig', 'nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence('clean', 'env:prod', 'templatecache', 'build', ['copy:localConfig', 'nodemon', 'watch'], done);
});
