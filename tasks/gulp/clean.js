var gulp = require('gulp'),
  del = require('del');

gulp.task('clean', function () {
  return del([
    'public/dist/*',
    '.coverdata'
  ]);
});

gulp.task('clean:build', function () {
  return del([
    'public/dist/*'
  ]);
});


gulp.task('clean:build:src', function () {
  return del([
    'public/dist/src'
  ]);
});

gulp.task('clean:coverage', function () {
  return del([
    '.coverdata'
  ]);
});
