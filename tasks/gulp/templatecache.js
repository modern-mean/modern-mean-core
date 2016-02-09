var gulp = require('gulp'),
  templateCache = require('gulp-angular-templatecache'),
  path = require('path'),
  endOfLine = require('os').EOL;

// Angular template cache task
gulp.task('templatecache', function () {

  return gulp.src(['modules/*/client/**/*.html'])
    .pipe(templateCache('templates.js', {
      root: 'modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
      templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '	}' + endOfLine + '})();' + endOfLine,
    }))
    .pipe(gulp.dest('public/dist/src'));
});
