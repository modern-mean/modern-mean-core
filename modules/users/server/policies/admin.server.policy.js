'use strict';

import aclModule from '../config/acl';

function policy() {
  return new Promise((resolve, reject) => {
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
        return resolve();
      })
      .catch(err => {
        return reject(err.message);
      });
  });
}

let adminPolicy = { policy: policy };

export { policy };
export default adminPolicy;
