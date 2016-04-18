'use strict';

import winston from 'winston';
import aclModule from '../config/acl';

function policy() {
  return new Promise((resolve, reject) => {
    winston.debug('Users::Policy::Admin::Start');
    aclModule
      .getAcl()
      .allow([{
        roles: ['admin'],
        allows: [{
          resources: '/api/users',
          permissions: '*'
        }]
      }])
      .then(() => {
        winston.verbose('Users::Routes::Admin::Success');
        return resolve();
      })
      .catch(err => {
        winston.error(err);
        return reject(err.message);
      });
  });
}

let adminPolicy = { policy: policy };

export { policy };
export default adminPolicy;
