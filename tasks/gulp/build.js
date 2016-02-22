var gulp = require('gulp'),
  concat = require('gulp-concat'),
  filter = require('gulp-filter'),
  debug = require('gulp-debug'),
  mainBowerFiles = require('main-bower-files'),
  rename = require('gulp-rename'),
  templateCache = require('gulp-angular-templatecache'),
  path = require('path'),
  endOfLine = require('os').EOL,
  inject = require('gulp-inject'),
  imagemin = require('imagemin'),
  pngquant = require('imagemin-pngquant'),
  del = require('del');



function angular() {
  var angularJS = filter(['**/angular.js'], { restore: true });
  return gulp.src(mainBowerFiles())
          .pipe(angularJS)
          .pipe(gulp.dest('./public/dist'));
}

function application() {
  var filterJS = filter(['**/*.js'], { restore: true }),
    filterCSS = filter(['**/*.css'], { restore: true });

  return gulp.src(['modules/core/client/app/core.client.app.loader.js', 'modules/*/client/**/!(*.spec).{js,css}'])
    .pipe(filterJS)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/dist'))
    .pipe(filterJS.restore)
    .pipe(filterCSS)
    .pipe(concat('application.css'))
    .pipe(gulp.dest('public/dist'));
}

function clean() {
  return del([
    'public/dist',
    '.coverdata'
  ]);
}

function images() {
  return gulp.src(['modules/*/client/**/*.{jpg,png,gif,ico}'])
    //.pipe(plugins.imagemin({
    //  progressive: true,
    //  svgoPlugins: [{ removeViewBox: false }],
    //  use: [pngquant()]
    //}))
    .pipe(gulp.dest('public/dist/img'));
}
images.displayName = 'Build Images';

function injectLayout() {
  return gulp.src('modules/core/server/views/layout.server.view.src.html')
    .pipe(inject(gulp.src(['public/dist/angular.js', 'public/dist/**/*.{js,css}']), {
      ignorePath: '/public'
    }))
    .pipe(rename('layout.server.view.html'))
    .pipe(gulp.dest('modules/core/server/views'));
}

function templates() {
  return gulp.src(['modules/*/client/**/*.html'])
    .pipe(templateCache('templates.js', {
      root: 'modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
      templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '	}' + endOfLine + '})();' + endOfLine,
    }))
    .pipe(gulp.dest('./public/dist'));
}


function vendor() {
  var filterJS = filter(['**/*.js', '!**/angular.js'], { restore: true }),
    filterCSS = filter(['**/*.css'], { restore: true }),
    filterFonts = filter('**/*.{svg,woff,woff2,eot,ttf}', { restore: true });

  return gulp.src(mainBowerFiles())
    .pipe(filterJS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(filterJS.restore)
    .pipe(filterCSS)
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(filterCSS.restore)
    .pipe(filterFonts)
    .pipe(gulp.dest('./public/dist/fonts'));
}




var build = gulp.series(gulp.parallel(application, vendor, angular, templates, images), injectLayout);



module.exports = {
  build: build,
  clean: clean
};
