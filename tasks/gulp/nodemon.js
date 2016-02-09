var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  _ = require('lodash'),
  defaultAssets = require('../../config/assets/default');

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});
