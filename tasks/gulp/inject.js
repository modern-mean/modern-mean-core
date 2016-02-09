var gulp = require('gulp'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  inject = require('gulp-inject'),
  rename = require('gulp-rename'),
  series = require('stream-series');

gulp.task('inject', function () {

  var core = gulp.src(['public/dist/**/core.js'] , { read: false });
  var sources = gulp.src(['public/dist/**/*.js', 'public/dist/**/*.css', '!public/dist/**/core.js'] , { read: false });

  return gulp.src('modules/core/server/views/layout.server.view.src.html')
    .pipe(inject(series(core, sources), {
      ignorePath: '/public'
    }))
    .pipe(rename('layout.server.view.html'))
    .pipe(gulp.dest('modules/core/server/views'));
});
