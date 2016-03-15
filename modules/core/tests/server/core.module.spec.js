import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import * as core from '../../server/core.module';
import routes from '../../server/routes//core.server.routes';
import express from 'express';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

console.log(core.init);

describe('/modules/core/server/core.module.js', () => {

  describe('export', () => {

    it('should export default', () => {
      return core.default.should.be.an.object;
    });

    it('should export init', () => {
      return core.default.should.be.a.function;
    });

    describe('init()', () => {
      let mockRoutes, app;

      describe('success', () => {

        beforeEach(() => {
          app = express();
          mockRoutes = sinon.stub(routes, 'init').resolves();
        });

        afterEach(() => {
          mockRoutes.restore();
        });

        it('should call core routes', () => {
          return core.init(app)
                  .then(() => {
                    return mockRoutes.should.be.calledWith(app);
                  });
        });

        it('should resolve a promise', () => {
          return core.init(app).should.be.fulfilled;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          app = express();
          mockRoutes = sinon.stub(routes, 'init').rejects();
        });

        afterEach(() => {
          mockRoutes.restore();
        });

        it('should reject a promise', () => {
          return core.init(app).should.be.rejected;
        });

      });

    });

  });




});
