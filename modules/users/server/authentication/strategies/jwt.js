'use strict';

import passport from 'passport';
import config from 'modernMean/config';
import chalk from 'chalk';
import JwtStrategy from 'passport-jwt';
import userModel from '../../models/users.server.model.user';

let jwtStrategy = JwtStrategy.Strategy;
let extract = JwtStrategy.ExtractJwt;

function strategy() {
  return new Promise(function (resolve, reject) {
    var opts = {};
    opts.secretOrKey = config.jwt.secret;
    opts.jwtFromRequest = extract.fromAuthHeader();

    passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
      let User = userModel.getModels().user;
      User.findById({ _id: jwt_payload.user })
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

let service = { strategy: strategy };

export default service;
export { strategy };
