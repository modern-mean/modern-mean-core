import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import adminRoutes from '../../server/routes/admin.server.routes';
import adminPolicy from '../../server/policies/admin.server.policy';
import * as adminUsers from '../../server/admin.users.module';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

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
      let routesSpy, policySpy, app;

      describe('success', () => {

        beforeEach(() => {
          app = express();
          routesSpy = sandbox.spy(adminRoutes, 'init');
          policySpy = sandbox.spy(adminPolicy, 'policy');
        });

        it('should setup user admin routes', () => {
          return adminUsers.init(app)
                  .then(() => {
                    return routesSpy.should.have.been.called;
                  });
        });

        it('should setup admin policy', () => {
          return adminUsers.init(app)
                  .then(() => {
                    return policySpy.should.have.been.called;
                  });
        });




        it('should resolve a promise', () => {
          return adminUsers.init(app).should.be.fulfilled;
        });

      });

      describe('error', () => {
        let mockRoutes;

        beforeEach(() => {
          app = express();
          mockRoutes = sandbox.stub(adminRoutes, 'init').rejects();
        });

        it('should reject a promise', () => {
          return adminUsers.init(app).should.be.rejected;
        });

      });

    });

  });

});
