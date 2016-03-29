'use strict';

import adminRoutes from './routes/admin.server.routes';
import adminPolicy from './policies/admin.server.policy';
import aclModule from './config/acl';
import chalk from 'chalk';


function init(app) {
  return new Promise(function(resolve, reject) {
    console.log(chalk.green('UsersAdmin::Init::Start'));
    aclModule.init()
      .then(adminPolicy.policy)
      .then(() => {
        adminRoutes.init(app)
          .then(() => {
            console.log(chalk.bold.green('UsersAdmin::Routes::Success'));
            resolve(app);
          })
          .catch(err => {
            console.log(chalk.bold.red('UsersAdmin::Routes::Error::' + err));
            reject(err);
          });
      })
      .catch(err => {
        console.log(chalk.bold.red('UsersAdmin::Init::Error::' + err));
        return reject(err);
      });


  });
}

let service = { init: init };

export default service;
export { init };
