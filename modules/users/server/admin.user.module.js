import adminRoutes from './routes/admin.server.routes';
import { policy } from './policies/admin.server.policy';
import chalk from 'chalk';


function init(app) {
  return new Promise(function(resolve, reject) {
    console.log(chalk.green('UsersAdmin::Init::Start'));
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

let service = { init: init };

export default service;
export { init }
