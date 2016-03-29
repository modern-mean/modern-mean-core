'use strict';

import passport from 'passport';
import express from 'express';
import nodeacl from 'acl';
import aclModule from '../config/acl';
import * as admin from '../controllers/admin.server.controller';

function init(app) {
  return new Promise((resolve, reject) => {
    let router = express.Router();
    let acl = aclModule.getAcl();

    //Set JWT Auth for all user Routes
    router.all('*', passport.authenticate('jwt', { session: false }));

    router.route('/')
      .get(acl.middleware(99, getUser), admin.list);

    // Single user routes
    router.route('/:userId')
      .get(acl.middleware(99, getUser), admin.read)
      .put(acl.middleware(99, getUser), admin.update)
      .delete(acl.middleware(99, getUser), admin.remove);

    // Finish by binding the user middleware
    router.param('userId', admin.userByID);

    app.use('/api/users', router);
    resolve(app);

  });
}

/* istanbul ignore next: Ignore for now... prolly could export the function to test it */
function getUser(req, res) {
  return req.user._id.toString();
}

let routes = { init: init };

export default routes;
export { init };
