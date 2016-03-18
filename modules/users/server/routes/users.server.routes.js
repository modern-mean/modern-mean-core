'use strict';

import passport from 'passport';
import express from 'express';
import forceSSL from 'express-force-ssl';
import chalk from 'chalk';
import { profile, password } from '../controllers/users.server.controller';

function init(app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.bold.green('Users::Routes::Start'));

    let router = express.Router();

    //Set JWT Auth for all user Routes
    router.all('*', passport.authenticate('jwt', { session: false }));

    // Setting up the users profile api
    router.route('/me').get(profile.me);
    router.route('/').put(profile.update);
    //TODO  renable when social accounts are working again.
    //router.route('/accounts').delete(controllers.authentication.removeOAuthProvider);
    router.route('/password').post(password.changePassword);
    router.route('/picture').post(profile.changeProfilePicture);

    app.use('/api/users', forceSSL, router);
    console.log(chalk.bold.green('Users::Routes::Success'));
    resolve(app);

  });
}

let service = { init: init };

export default service;
export { init };
