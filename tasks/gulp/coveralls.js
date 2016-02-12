var gulp = require('gulp'),
  concat = require('gulp-concat'),
  coveralls = require('gulp-coveralls');

// Lint CSS and JavaScript files.
gulp.task('coveralls', function (done) {
  if (!process.env.CI) return done();
  return gulp.src('.coverdata/*/lcov.info')
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
});
