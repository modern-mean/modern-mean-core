var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  _ = require('lodash'),
  defaultAssets = require('../../config/assets/default'),
  testAssets = require('../../config/assets/test');

// ESLint JS linting task
gulp.task('eslint', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS,
    defaultAssets.client.js,
    testAssets.tests.server,
    testAssets.tests.client,
    testAssets.tests.e2e
  );

  return gulp.src(assets)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});
