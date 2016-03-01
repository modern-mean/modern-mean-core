import userRoutes from './routes/users.server.routes';
import authRoutes from './routes/auth.server.routes';
import { authentication } from './authentication/authentication';
import chalk from 'chalk';
import mongoose from 'mongoose';


function init(app) {
  return new Promise(function(resolve, reject) {
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
}

export default init;
