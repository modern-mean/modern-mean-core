'use strict';

import nodeacl from 'acl';

// Using the memory backend
let acl = new nodeacl(new nodeacl.memoryBackend());

function policy() {
  return new Promise(function(resolve, reject) {
    acl.allow([{
      roles: ['admin'],
      allows: [{
        resources: '/',
        permissions: '*'
      }, {
        resources: '/:userId',
        permissions: '*'
      }]
    }]);
    resolve();
  });
}

function allowed(req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  //TODO Need to check this policy.  The resource should probably be /api/users etc.  I am guessing the / may be bad.
  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase())
    .then(function (allowed) {
      if (allowed) {
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    })
    .catch(function (err) {
      return res.status(500).send('Unexpected authorization error');
    });
}

let adminPolicy = { policy: policy, allowed: allowed };

export { policy, allowed };
export default adminPolicy;
