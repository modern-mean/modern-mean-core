var gulp = require('gulp'),
  _ = require('lodash'),
  plugins = require('gulp-load-plugins')(),
  defaultAssets = require('../../config/assets/default'),
  testAssets = require('../../config/assets/test');


// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.js, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.less, ['less', 'csslint']).on('change', plugins.livereload.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'jshint']);
    gulp.watch(defaultAssets.client.views, ['templatecache', 'jshint']).on('change', plugins.livereload.changed);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['jshint']);
    gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
  }

  if (process.env.NODE_ENV === 'test') {
    // Add Server Test file rules
    gulp.watch([testAssets.tests.server, defaultAssets.server.allJS], ['test:server']).on('change', function (file) {
      var runOnlyChangedTestFile = argv.onlyChanged ? true : false;

      // check if we should only run a changed test file
      if (runOnlyChangedTestFile) {
        var changedTestFiles = [];

        // iterate through server test glob patterns
        _.forEach(testAssets.tests.server, function (pattern) {
          // determine if the changed (watched) file is a server test
          _.forEach(glob.sync(pattern), function (f) {
            var filePath = path.resolve(f);

            if (filePath === path.resolve(file.path)) {
              changedTestFiles.push(f);
            }
          });
        });

        // set task argument for tracking changed test files
        argv.changedTestFiles = changedTestFiles;
      }

      plugins.livereload.changed();
    });
  }
});
