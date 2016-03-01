'use strict';


import passport from 'passport';
import config from 'config/config';
import { strategy as jwt } from './strategies/jwt';
import { strategy as local } from './strategies/local';
import chalk from 'chalk';


function authentication(app) {
  return new Promise(function (resolve, reject) {
    Promise.all([ jwt(app), local(app) ])
      .then(function () {
        app.use(passport.initialize());
        console.log(chalk.bold.green('Users::Authentication::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Users::Authentication::Error' + err));
        reject(err);
      });
  });
}

export { authentication };
