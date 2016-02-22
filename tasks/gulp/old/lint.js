var gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('lint', function (done) {
  runSequence(['lint:js', 'lint:css'], done);
});

gulp.task('lint:js', function (done) {
  runSequence(['eslint', 'jshint'], done);
});

gulp.task('lint:css', function (done) {
  runSequence('less', 'sass', ['csslint'], done);
});
