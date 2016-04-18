'use strict';

import express from 'express';
import passport from 'passport';
import winston from 'winston';
import { authentication } from '../controllers/users.server.controller';
import userModel from '../models/users.server.model.user';

function init(app) {
  return new Promise(function (resolve, reject) {
    winston.debug('Users::Routes::Authentication::Start');
    let router = express.Router();

    router.route('/signup').post(userModel.create, authentication.signup);
    router.route('/signin').post(passport.authenticate('local', { session: false }), authentication.signin);

    app.use('/api/auth', router);
    winston.verbose('Users::Routes::Authentication::Success');
    return resolve(app);
  });
}

let controller = { init: init };

export default controller;
export { init };
  /*
module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users password api
  //app.route('/api/auth/forgot').post(users.forgot);
  //app.route('/api/auth/reset/:token').get(users.validateResetToken);
  //app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api



  // Setting the facebook oauth routes
  app.route('/api/auth/facebook').get(users.oauthCall('facebook', {
    scope: ['email']
  }));
  app.route('/api/auth/facebook/callback').get(users.oauthCallback('facebook'));

  // Setting the twitter oauth routes
  app.route('/api/auth/twitter').get(users.oauthCall('twitter'));
  app.route('/api/auth/twitter/callback').get(users.oauthCallback('twitter'));

  // Setting the google oauth routes
  app.route('/api/auth/google').get(users.oauthCall('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.route('/api/auth/linkedin').get(users.oauthCall('linkedin', {
    scope: [
      'r_basicprofile',
      'r_emailaddress'
    ]
  }));
  app.route('/api/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.route('/api/auth/github').get(users.oauthCall('github'));
  app.route('/api/auth/github/callback').get(users.oauthCallback('github'));

  // Setting the paypal oauth routes
  app.route('/api/auth/paypal').get(users.oauthCall('paypal'));
  app.route('/api/auth/paypal/callback').get(users.oauthCallback('paypal'));

};
  */
