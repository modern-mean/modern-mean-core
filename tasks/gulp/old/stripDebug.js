var gulp = require('gulp'),
  stripDebug = require('gulp-strip-debug');

gulp.task('stripDebug', function () {
  return gulp.src('public/dist/**/application.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('public/dist'));
});
