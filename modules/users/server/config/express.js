'use strict';

var passport = require('passport'),
  path = require('path'),
  chalk = require('chalk'),
  glob = require('glob'),
  config = require(path.resolve('./config/config'));


function userExpressConfig(app) {

  return new Promise(function (resolve, reject) {
    glob('./build/users/server/config/strategies/**/*.js')
      .on('match', function (strategy) {
        require(path.resolve(strategy))(config);
      })
      .on('end', function (files) {
        console.log(chalk.green('Users::Strategies::Success'));
        app.use(passport.initialize());
        resolve(app);
      })
      .on('error', function (err) {
        console.log(chalk.red('Users::Strategies::Error'), err);
        reject(err);
      });
  });
}

module.exports = userExpressConfig;
