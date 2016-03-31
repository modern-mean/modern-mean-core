'use strict';

import lodash from 'lodash';
import passport from 'passport';
import chalk from 'chalk';
import userModel from '../../models/users.server.model.user';

let LocalStrategy = require('passport-local').Strategy;

function strategy() {
  return new Promise(function (resolve, reject) {
    // Use local strategy
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      let User = userModel.getModels().user;
      User.findOne({ 'providers.type': 'local', 'providers.email': email.toLowerCase() })
        .then(user => {
          if (!user) {
            return done('Invalid email or password', false);
          }

          let localProvider = lodash.find(user.providers, { type: 'local' });

          if (!localProvider || !localProvider.authenticate(password)) {
            return done('Invalid email or password', false);
          }



          return done(null, user);
        })
        .catch(err => {
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
