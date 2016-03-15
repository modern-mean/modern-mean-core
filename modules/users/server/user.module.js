'use strict';

import userModel from './models/users.server.model.user';
import userSeed from './models/users.server.model.user.seed';
import userRoutes from './routes/users.server.routes';
import authRoutes from './routes/auth.server.routes';
import authentication from './authentication/authentication';
import chalk from 'chalk';
import config from 'modernMean/config';


function init(app) {

  console.log(chalk.bold.green('Users::Init::Start'));

  let modelInit = new Promise(function (resolve, reject) {
    userModel
      .init()
      .then(function (model) {
        if (config.seedDB) {
          userSeed();
        }
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });


  let expressInit = new Promise(function (resolve, reject) {
    authentication(app)
      .then(userRoutes)
      .then(authRoutes)
      .then(function () {
        console.log(chalk.bold.green('Users::Init::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Users::Init::Error::' + err));
        reject(err);
      });
  });

  return Promise.all([modelInit, expressInit]);
}

let service = { init: init };

export default service;
export { init };
