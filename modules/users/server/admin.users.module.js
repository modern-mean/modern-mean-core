'use strict';

import winston from 'winston';
import adminRoutes from './routes/admin.server.routes';
import adminPolicy from './policies/admin.server.policy';
import aclModule from './config/acl';

function init(app) {
  return new Promise(function(resolve, reject) {
    winston.debug('UsersAdmin::Init::Start');
    aclModule.init()
      .then(adminPolicy.policy)
      .then(() => {
        adminRoutes.init(app)
          .then(() => {
            winston.verbose('UsersAdmin::Routes::Success');
            return resolve(app);
          })
          .catch(err => {
            winston.error(err);
            return reject(err);
          });
      })
      .catch(err => {
        winston.error(err);
        return reject(err);
      });


  });
}

let service = { init: init };

export default service;
export { init };
