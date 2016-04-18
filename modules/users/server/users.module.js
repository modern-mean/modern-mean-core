'use strict';

import winston from 'winston';
import userModel from './models/users.server.model.user';
import userSeed from './models/users.server.model.user.seed';
import userRoutes from './routes/users.server.routes';
import authRoutes from './routes/auth.server.routes';
import authentication from './authentication/authentication';
import config from 'modernMean/config';


function init(app) {
  winston.debug('Users::Init::Start');

  let modelInit = new Promise(function (resolve, reject) {
    winston.debug('Users::Init::Model::Start');
    userModel
      .init()
      .then(function (model) {
        if (config.seedDB) {
          userSeed.init();
        }
        winston.verbose('Users::Init::Model::Success');
        return resolve();
      })
      .catch(function (err) {
        winston.error(err);
        return reject(err);
      });
  });


  let expressInit = new Promise(function (resolve, reject) {
    winston.debug('Users::Init::Express::Start');
    authentication.init(app)
      .then(userRoutes.init)
      .then(authRoutes.init)
      .then(function () {
        winston.verbose('Users::Init::Success');
        return resolve(app);
      })
      .catch(function (err) {
        winston.error('Users::Init::Error::' + err);
        return reject(err);
      });
  });

  return Promise.all([modelInit, expressInit]);
}

let service = { init: init };

export default service;
export { init };
