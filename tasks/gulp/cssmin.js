var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

  // CSS minifying task
  gulp.task('cssmin', function () {
    return gulp.src(['public/dist/src/*.css'])
      .pipe(plugins.cssmin())
      .pipe(gulp.dest('public/dist'));
  });
