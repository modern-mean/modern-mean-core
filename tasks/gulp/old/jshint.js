var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  return gulp.src(['modules/**/*.js', 'config/**/*.js', 'tasks/**/*.js'])
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
