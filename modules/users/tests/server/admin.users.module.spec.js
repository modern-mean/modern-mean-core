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

describe('/modules/users/server/admin.users.module.js', () => {

  describe('export', () => {

    it('should export default', () => {
      return adminUsers.default.should.be.an.object;
    });

    it('should export init', () => {
      return adminUsers.default.should.be.a.function;
    });

    describe('init()', () => {
      let routesSpy, policySpy, app;

      describe('success', () => {

        beforeEach(() => {
          app = express();
          routesSpy = sinon.spy(adminRoutes, 'init');
          policySpy = sinon.spy(adminPolicy, 'policy');
        });

        afterEach(() => {
          routesSpy.restore();
          policySpy.restore();
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
          mockRoutes = sinon.stub(adminRoutes, 'init').rejects();
        });

        afterEach(() => {
          mockRoutes.restore();
        });

        it('should reject a promise', () => {
          return adminUsers.init(app).should.be.rejected;
        });

      });

    });

  });

});
