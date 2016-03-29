'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import express from 'express';
import request from 'superagent';
import * as routes from '../../../server/routes/core.server.routes';
import * as controller from '../../../server/controllers/core.server.controller';
import mean from '../../../server/app/init';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('modules/core/server/routes/core.server.routes.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should export default', () => {
    return routes.default.should.be.an('object');
  });

  it('should export init', () => {
    return routes.init.should.be.a('function');
  });

  describe('init()', () => {
    let app;

    beforeEach(() => {
      app = express();
    });

    describe('successa', () => {

      it('should resolve a promise', () => {
        return routes.init(app).should.be.resolved;
      });

      it('should set static routes', () => {
        let spy = sandbox.spy(app, 'use');
        return routes.init(app)
                .then(() => {
                  return spy.should.have.been.calledWith('/');
                });
      });

      it('should set core routes', () => {
        let spy = sandbox.spy(app, 'route');
        return routes.init(app)
                .then(() => {
                  spy.getCall(0).should.have.been.calledWith('/server-error');
                  spy.getCall(1).should.have.been.calledWith('/:url(api|build|public)/*');
                  return spy.getCall(2).should.have.been.calledWith('/*');
                });
      });

    });

    describe('error', () => {

      let mockExpress;

      beforeEach(() => {
        mockExpress = sandbox.stub(app, 'use').throws('yay');
      });

      it('should reject a promise', () => {
        return routes.init(app).should.be.rejectedWith('yay');
      });

    });

  });

});
