var gulp = require('gulp'),
  concat = require('gulp-concat'),
  series = require('stream-series'),
  mainBowerFiles = require('main-bower-files'),
  runSequence = require('run-sequence');

gulp.task('concat', function () {
  runSequence(['concat:js', 'concat:css']);
});

gulp.task('concat:js', function () {
  runSequence(['concat:js:application', 'concat:js:vendor', 'concat:js:core']);
});

gulp.task('concat:js:application', function () {
  var appConfig = gulp.src(['modules/core/client/app/config.js', 'modules/core/client/app/init.js']);
  var app = gulp.src(['modules/*/client/**/*.js', '!modules/core/client/app/*.js']);

  return series(appConfig, app)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/dist/src'));
});

gulp.task('concat:js:vendor', function () {

  return gulp.src(mainBowerFiles(['**/*.js', '!**/angular.js']))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/dist/src'));

});

gulp.task('concat:js:core', function () {

  return gulp.src(mainBowerFiles(['**/angular.js']))
    .pipe(concat('core.js'))
    .pipe(gulp.dest('public/dist/src'));

});

gulp.task('concat:css', function () {
  runSequence(['concat:css:application', 'concat:css:vendor']);
});

gulp.task('concat:css:application', function () {
  return gulp.src('modules/*/client/**/*.css')
    .pipe(concat('application.css'))
    .pipe(gulp.dest('public/dist/src'));
});

gulp.task('concat:css:vendor', function () {
  return gulp.src(mainBowerFiles(['**/*.css']))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/dist/src'));

});
