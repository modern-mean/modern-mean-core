var gulp = require('gulp'),
  eslint = require('gulp-eslint');


// ESLint JS linting task
gulp.task('eslint', function () {
  return gulp.src(['modules/**/*.js', 'config/**/*.js', 'tasks/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});
