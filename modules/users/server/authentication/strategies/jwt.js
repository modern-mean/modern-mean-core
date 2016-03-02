'use strict';

import { get as model } from '../../models/user.server.model';
import passport from 'passport';
import config from '../../../../../config/config';
import chalk from 'chalk';

let JwtStrategy = require('passport-jwt').Strategy;



export function strategy() {
  return new Promise(function (resolve, reject) {

    var opts = {};
    opts.secretOrKey = config.jwt.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

      let User = model();
      User.findById({ _id: jwt_payload.user }, '-salt -password')
        .then(function (user) {
          if (!user) {
            return done('User not found');
          }

          return done(null, user);
        })
        .catch(function (err) {
          return done(err, false);
        });

    }));
    console.log(chalk.bold.green('Users::Authentication::Jwt::Success'));
    resolve();
  });
}
