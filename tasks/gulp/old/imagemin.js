var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
  return gulp.src(['modules/*/client/**/*.{jpg,png,gif,ico}'])
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/dist/img'));
});
