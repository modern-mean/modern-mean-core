var gulp = require('gulp'),
  obfuscate = require('gulp-obfuscate');

// TODO Once we are valid JP style this should work  http://stackoverflow.com/questions/34651856/how-can-i-obfuscate-angularjs-codes
gulp.task('obfuscate', function () {
  return gulp.src('public/dist/application.min.js')
    .pipe(obfuscate({ replaceMethod: obfuscate.ZALGO }))
    .pipe(gulp.dest('public/dist'));
});
