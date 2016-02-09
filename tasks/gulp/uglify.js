var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  _ = require('lodash'),
  pngquant = require('imagemin-pngquant'),
  defaultAssets = require('../../config/assets/default');

// JS minifying task
gulp.task('uglify', function () {
  var assets = _.union(
    defaultAssets.client.js,
    defaultAssets.client.templates
  );

  return gulp.src(assets)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(plugins.concat('application.min.js'))
    .pipe(gulp.dest('public/dist'));
});
