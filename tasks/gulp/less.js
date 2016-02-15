var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less');


gulp.task('less', function () {
  return gulp.src(['modules/*/client/css/**/*.less'])
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/dist/css/'));
});
