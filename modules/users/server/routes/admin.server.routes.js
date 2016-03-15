'use strict';

import passport from 'passport';
import express from 'express';
import * as admin from '../controllers/admin.server.controller';
import * as acl from '../policies/admin.server.policy';

function init(app) {
  return new Promise(function (resolve, reject) {
    try {
      let router = express.Router();

      //Set JWT Auth for all user Routes
      router.all('*', passport.authenticate('jwt', { session: false }));
      //TODO IMplment policies
      router.route('/')
        .get(acl.allowed, admin.list);

      // Single user routes
      router.route('/:userId')
        .get(acl.allowed, admin.read)
        .put(acl.allowed, admin.update)
        .delete(acl.allowed, admin.remove);

      // Finish by binding the user middleware
      router.param('userId', admin.userByID);

      app.use('/api/admin/users', router);
      resolve(app);
    } catch(err) {
      reject(err);
    }

  });
}

let routes = { init: init };

export default routes;
export { init };
