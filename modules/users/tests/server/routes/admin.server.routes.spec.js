'use strict';

import express from 'express';
import * as adminRoutes from '../../../server/routes/admin.server.routes.js';
import adminController from '../../../server/controllers/admin.server.controller';
import userModel from '../../../server/models/users.server.model.user';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('modules/users/server/routes/admin.server.routes.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(aclModule, 'getAcl').returns({
      middleware: sandbox.stub().returns(function (req, res, next) {
        next();
      })
    });
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return adminRoutes.default.should.be.an('object');
    });

    it('should export init', () => {
      return adminRoutes.init.should.be.a('function');
    });

  });

  describe('init', () => {
    let app, routerStub, mockRouter, expressSpy;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(mockRouter, 'param');
      expressSpy = sandbox.spy(app, 'use');
      routerStub = sandbox.stub(express, 'Router').returns(mockRouter);
      return adminRoutes.init(app);
    });

    it ('should create a new router', () => {
      return routerStub.should.have.been.called;
    });

    it ('should be secured by passport jwt', () => {
      return mockRouter.all.should.have.been.calledWith('*', sinon.match.func);
    });

    it ('should call app.use with router', () => {
      return mockRouter.param.should.have.been.calledWith('userId', adminController.userByID);
    });

    it ('should call app.use with router', () => {
      return expressSpy.should.have.been.calledWith('/api/users', mockRouter);
    });

  });

  describe('/ route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        get: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(0).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return adminRoutes.init(app);
    });

    it('should call route with /', () => {
      return routeStub.should.have.been.calledWith('/');
    });

    it('should call .get with acl.middleware and admin.list', () => {
      return mockRoute.get.should.have.been.calledWith(sinon.match.func, adminController.list);
    });

  });

  describe('/:userId route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        get: sandbox.stub().returnsThis(),
        put: sandbox.stub().returnsThis(),
        delete: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(1).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return adminRoutes.init(app);
    });

    it('should call route with /', () => {
      return routeStub.should.have.been.calledWith('/:userId');
    });

    it('should call .get with acl.middleware and admin.read', () => {
      return mockRoute.get.should.have.been.calledWith(sinon.match.func, adminController.read);
    });

    it('should call .put with acl.middleware and admin.udate', () => {
      return mockRoute.put.should.have.been.calledWith(sinon.match.func, adminController.update);
    });

    it('should call .delete with acl.middleware and admin.delete', () => {
      return mockRoute.delete.should.have.been.calledWith(sinon.match.func, adminController.remove);
    });

  });




});
