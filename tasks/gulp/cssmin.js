var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  defaultAssets = require('../../config/assets/default');

  // CSS minifying task
  gulp.task('cssmin', function () {
    return gulp.src(defaultAssets.client.css)
      .pipe(plugins.cssmin())
      .pipe(plugins.concat('application.min.css'))
      .pipe(gulp.dest('public/dist'));
  });
