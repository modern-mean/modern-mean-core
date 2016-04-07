'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import express from 'express';
import promised from 'chai-as-promised';
import request from 'supertest';
import * as userRoutes from '../../../server/routes/users.server.routes.js';
import userController from '../../../server/controllers/users.server.controller';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('modules/users/server/routes/users.server.routes.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return userRoutes.default.should.be.an('object');
    });

    it('should export init', () => {
      return userRoutes.init.should.be.a('function');
    });

  });

  describe('init', () => {
    let app, routerStub, mockRouter, expressSpy;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      sandbox.stub(mockRouter, 'all');
      expressSpy = sandbox.spy(app, 'use');
      routerStub = sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it ('should create a new router', () => {
      return routerStub.should.have.been.called;
    });

    it ('should be secured by passport jwt', () => {
      return mockRouter.all.should.have.been.calledWith('*', sinon.match.func);
    });

    it ('should call app.use with router', () => {
      return expressSpy.should.have.been.calledWith('/api/me', mockRouter);
    });

  });

  describe('/ route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        get: sandbox.stub().returnsThis(),
        put: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(0).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /', () => {
      return routeStub.should.have.been.calledWith('/');
    });

    it('should call .get with profile.me', () => {
      return mockRoute.get.should.have.been.calledWith(userController.profile.me);
    });

    it('should call .put with profile.update', () => {
      return mockRoute.put.should.have.been.calledWith(userController.profile.update);
    });

  });

  describe('/addresses route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        put: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(1).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /authorization', () => {
      return routeStub.should.have.been.calledWith('/addresses');
    });

    it('should call .get with profile.addresses', () => {
      return mockRoute.put.should.have.been.calledWith(userController.profile.addresses);
    });

  });

  describe('/authorization route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        get: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(2).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /authorization', () => {
      return routeStub.should.have.been.calledWith('/authorization');
    });

    it('should call .get with authorization.read', () => {
      return mockRoute.get.should.have.been.calledWith(userController.authorization.read);
    });

  });

  describe('/emails route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        put: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(3).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /password', () => {
      return routeStub.should.have.been.calledWith('/emails');
    });

    it('should call .get with profile.emails', () => {
      return mockRoute.put.should.have.been.calledWith(userController.profile.emails);
    });

  });

  describe('/password route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        post: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(4).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /password', () => {
      return routeStub.should.have.been.calledWith('/password');
    });

    it('should call .get with authorization.read', () => {
      return mockRoute.post.should.have.been.calledWith(userController.password.changePassword);
    });

  });

  describe('/picture route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        post: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(5).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return userRoutes.init(app);
    });

    it('should call route with /picture', () => {
      return routeStub.should.have.been.calledWith('/picture');
    });

    it('should call .get with upload and profile.changeProfilePicture', () => {
      return mockRoute.post.should.have.been.calledWith(sinon.match.func, userController.profile.changeProfilePicture);
    });

  });

});
