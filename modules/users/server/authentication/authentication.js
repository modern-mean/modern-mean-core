'use strict';

import passport from 'passport';
import winston from 'winston';
import jwtStrategy from './strategies/jwt';
import localStrategy from './strategies/local';

function init(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Users::Authentication::Start');
    Promise.all([ jwtStrategy.strategy(app), localStrategy.strategy(app) ])
      .then(function () {
        app.use(passport.initialize());
        winston.verbose('Users::Authentication::Success');
        return resolve(app);
      })
      .catch(function (err) {
        winston.error(err);
        return reject(err);
      });
  });
}

let service = { init: init };

export default service;
export { init };
