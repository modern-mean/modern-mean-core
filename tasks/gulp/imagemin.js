var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  defaultAssets = require('../../config/assets/default');

gulp.task('imagemin', function () {
  return gulp.src(defaultAssets.client.img)
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/dist/img'));
});
