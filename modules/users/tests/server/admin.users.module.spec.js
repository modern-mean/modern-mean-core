'use strict';

import express from 'express';
import adminRoutes from '../../server/routes/admin.server.routes';
import adminPolicy from '../../server/policies/admin.server.policy';
import aclModule from '../../server/config/acl';
import * as adminUsers from '../../server/admin.users.module';
import mongooseModule from '../../../core/server/app/mongoose';

let sandbox;

describe('/modules/users/server/admin.users.module.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return adminUsers.default.should.be.an('object');
    });

    it('should export init', () => {
      return adminUsers.init.should.be.a('function');
    });

    describe('init()', () => {
      let routesStub, policyStub, aclStub, app;

      describe('success', () => {

        beforeEach(() => {
          app = express();
          routesStub = sandbox.stub(adminRoutes, 'init').resolves();
          policyStub = sandbox.stub(adminPolicy, 'policy').resolves();
          aclStub = sandbox.stub(aclModule, 'init').resolves();

        });

        it('should setup acl', () => {
          return adminUsers.init(app)
                  .then(() => {
                    return aclStub.should.have.been.called;
                  });
        });

        it('should setup user admin routes', () => {
          return adminUsers.init(app)
                  .then(() => {
                    return routesStub.should.have.been.called;
                  });
        });

        it('should setup admin policy', () => {
          return adminUsers.init(app)
                  .then(() => {
                    return policyStub.should.have.been.called;
                  });
        });

        it('should resolve a promise', () => {
          return adminUsers.init(app).should.be.fulfilled;
        });

      });

      describe('error', () => {


        describe('acl', () => {
          let aclStub;

          beforeEach(() => {
            app = express();
            aclStub = sandbox.stub(aclModule, 'init').rejects('Error!');
          });

          it('should reject a promise', () => {
            return adminUsers.init(app).should.be.rejectedWith('Error!');
          });

        });

        describe('routes', () => {
          let routesStub;

          beforeEach(() => {
            app = express();
            routesStub = sandbox.stub(adminRoutes, 'init').rejects('Error!');
          });

          it('should reject a promise', () => {
            return adminUsers.init(app).should.be.rejectedWith('Error!');
          });

        });

      });

    });

  });

});
