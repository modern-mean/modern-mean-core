'use strict';

import { get as model } from '../../models/users.server.model.user';
import passport from 'passport';
import chalk from 'chalk';

let LocalStrategy = require('passport-local').Strategy;

function strategy() {
  return new Promise(function (resolve, reject) {
    // Use local strategy
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      let User = model();
      User.findOne({ email: email.toLowerCase() })
        .then(function (user) {
          if (!user || !user.authenticate(password)) {
            return done('Invalid email or password', false);
          }

          return done(null, user);
        })
        .catch(function (err) {
          return done(err, false);
        });
    }));
    console.log(chalk.bold.green('Users::Authentication::Local::Success'));
    resolve();
  });
}

let service = { strategy: strategy };

export default service;
export { strategy };
