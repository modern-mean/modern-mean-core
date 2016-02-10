var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

// JS minifying task
gulp.task('uglify', function () {
  return gulp.src('public/dist/*.js')
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({
      mangle: true
    }))
    .pipe(gulp.dest('public/dist'));
});
