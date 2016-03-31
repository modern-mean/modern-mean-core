'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import { Server as KarmaServer } from 'karma';
import coverage from 'gulp-coverage';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul';
import babel from 'gulp-babel';
import * as build from './build';
import { mergeEnvironment } from '../../config/config.js';
import lodash from 'lodash';
import debug from 'gulp-debug';

var isparta = require('isparta');

function lint() {
  let config = mergeEnvironment();
  return gulp.src(config.files.test.lint.eslint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'lint';

function karmaSingle(done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start();
}
karmaSingle.displayName = 'karma';

function karmaWatch(done) {
  new KarmaServer({
    configFile: process.cwd() + '/karma.conf.js',
    autoWatch: true
  }, function() {
        done();
    }).start();
}
karmaWatch.displayName = 'karmaWatch';

function mochaSingle(done) {
  let config = mergeEnvironment();
  gulp.src(config.files.test.server.coverage)
  	.pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  	.on('finish', function () {
  	  gulp.src(config.files.test.server.tests)
      //.pipe(injectModules())
  		.pipe(mocha({
        reporter: 'dot'
      }))
  		.pipe(istanbul.writeReports(
        {
          dir: './.coverdata/server',
          reporters: [ 'lcov', 'html', 'text' ]
        }
      ))
      .once('error', () => {
        process.exit(1);
        return done();
      })
      .once('end', () => {
        return done();
      });
  	});
}
mochaSingle.displayName = 'Test::Mocha::Single';

function mochaWatch(done) {
  let config = mergeEnvironment();
  return gulp.src(config.files.test.server.coverage)
  	.pipe(istanbul({
        instrumenter: isparta.Instrumenter,
        includeUntested: true
      }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())

  	.on('finish', function () {
  	  return gulp.src(config.files.test.server.tests)
    		//.pipe(babel())
    		//.pipe(injectModules())
    		.pipe(mocha({
          timeout: 4000
        }))
        .on('error', gutil.log)
    		.pipe(istanbul.writeReports(
          {
            dir: './.coverdata/server',
            reporters: [ 'lcov', 'html', 'text' ]
          }
        ))

  	});
}
mochaWatch.displayName = 'Test::Mocha::Watch';

function watchServerTests(done) {
  let config = mergeEnvironment();
  gulp.watch(lodash.union(config.files.test.server.tests, config.files.test.server.coverage), gulp.series(build.server, mochaWatch));
  return mochaWatch(done);
}
watchServerTests.displayName = 'Test::Watch::Server';

function sendCoveralls(done) {
  if (!process.env.CI) return done();
  return gulp.src('.coverdata/**/lcov.info')
    .pipe(debug({title: 'coveralls'}))
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}

let client = {
  single: karmaSingle,
  watch: karmaWatch
};

let server = {
  single: mochaSingle,
  watch: watchServerTests
};

export {
  client,
  server,
  sendCoveralls as coveralls,
  lint
};
