var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  defaultAssets = require('../../config/assets/default');

// Sass task
gulp.task('sass', function () {
  return gulp.src(defaultAssets.client.sass)
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename(function (file) {
      file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
    }))
    .pipe(gulp.dest('./modules/'));
});
