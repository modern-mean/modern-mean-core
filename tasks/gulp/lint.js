var gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('lint', function (done) {
  runSequence('less', 'sass', ['csslint', 'eslint', 'jshint'], done);
});
