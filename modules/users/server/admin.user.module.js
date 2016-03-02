import adminRoutes from './routes/admin.server.routes';
import { policy } from './policies/admin.server.policy';
import chalk from 'chalk';
import mongoose from 'mongoose';

function init(app) {
  return new Promise(function(resolve, reject) {
    adminRoutes(app)
      .then(policy)
      .then(function () {
        console.log(chalk.bold.green('UsersAdmin::Init::Success'));
        resolve(app);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('UsersAdmin::Init::Error::' + err));
        reject(err);
      });
  });
}

export default init;
