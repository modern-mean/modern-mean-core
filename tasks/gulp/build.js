"use strict";

import gulp from 'gulp';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import mainBowerFiles from 'main-bower-files';
import rename from 'gulp-rename';
import templateCache from 'gulp-angular-templatecache';
import { EOL as endOfLine } from 'os';
import inject from 'gulp-inject';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import del from 'del';
import babel from 'gulp-babel';
import stripDebug from 'gulp-strip-debug';

function angular() {
  var angularJS = filter(['**/angular.js'], { restore: false });
  return gulp.src(mainBowerFiles())
          .pipe(angularJS)
          .pipe(gulp.dest('./public/dist'));
}
angular.displayName = 'Angular';

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
application.displayName = 'Client::Application';

function images() {
  return gulp.src(['modules/*/client/**/*.{jpg,png,gif,ico}'])
  .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ],
        use: [pngquant()]
      }))
    .pipe(gulp.dest('public/dist/img'));
}
images.displayName = 'Build Images';

function injectLayout() {
  return gulp.src('./build/core/server/views/index.server.view.html')
    .pipe(inject(gulp.src(['public/dist/angular.js', 'public/dist/**/*.{js,css}'], {read: false}), {
      ignorePath: '/public'
    }))
    .pipe(gulp.dest('./build/core/server/views/'));
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

function serverFiles() {
  var filterJS = filter(['**/*.js'], { restore: true });
  return gulp.src(['./modules/*/server/**/*.{js,html}', './confi*/**/*.js'])
    .pipe(filterJS)
    .pipe(babel({
      "presets": ["es2015"],
      "plugins": []
    }))
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./build'));
}

function clean() {
  return del([
    './public/dist',
    './build',
    './.coverdata'
  ]);
}

function config() {
  return gulp.src(['./build/config/**/*.js'])
    .pipe(gulp.dest('./node_modules/modernMean'));
}

function stripServerDebug(done) {
  if (process.env.NODE_ENV !== 'development') {
    return gulp.src(['./build/**/!(*.spec).js'])
      .pipe(stripDebug())
      .pipe(gulp.dest('./build'));
  } else {
    return done();
  }
}

function stripClientDebug(done) {
  if (process.env.NODE_ENV !== 'development') {
    return gulp.src(['./public/dist/**/application.js'])
      .pipe(stripDebug())
      .pipe(gulp.dest('./public/dist'));
  } else {
    return done();
  }
}

let strip = gulp.parallel(stripServerDebug, stripClientDebug);
strip.displayName = 'Build::All::StripDebug';

let server = gulp.series(serverFiles, config);
let client = gulp.series(gulp.parallel(application, vendor, angular, templates, images));
let build = gulp.series(gulp.parallel(server, client), injectLayout);

export {
  build,
  clean,
  client,
  server,
  injectLayout as inject,
  strip
};
