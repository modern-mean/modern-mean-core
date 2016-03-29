'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import express from 'express';
import promised from 'chai-as-promised';
import request from 'supertest';
import * as authRoutes from '../../../server/routes/auth.server.routes.js';
import userController from '../../../server/controllers/users.server.controller';
import userModel from '../../../server/models/users.server.model.user';


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
      return authRoutes.default.should.be.an('object');
    });

    it('should export init', () => {
      return authRoutes.init.should.be.a('function');
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
      return authRoutes.init(app);
    });

    it ('should create a new router', () => {
      return routerStub.should.have.been.called;
    });

    it ('should call app.use with router', () => {
      return expressSpy.should.have.been.calledWith('/api/auth', mockRouter);
    });

  });

  describe('/signup route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        post: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(0).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return authRoutes.init(app);
    });

    it('should call route with /signup', () => {
      return routeStub.should.have.been.calledWith('/signup');
    });

    it('should call .post with userModel.create and authentication.signup', () => {
      return mockRoute.post.should.have.been.calledWith(userModel.create, userController.authentication.signup);
    });

  });

  describe('/signin route', () => {
    let app, routerStub, mockRouter, routeStub, realRoute, mockRoute;

    beforeEach(() => {
      app = express();
      mockRouter = express.Router();
      mockRoute = {
        post: sandbox.stub().returnsThis()
      };
      realRoute = mockRouter.route('asdf');
      routeStub = sandbox.stub(mockRouter, 'route');
      routeStub.onCall(1).returns(mockRoute);
      routeStub.returns(realRoute);
      sandbox.stub(mockRouter, 'all');
      sandbox.stub(express, 'Router').returns(mockRouter);
      return authRoutes.init(app);
    });

    it('should call route with /signin', () => {
      return routeStub.should.have.been.calledWith('/signin');
    });

    it('should call .post with authentication.signin', () => {
      return mockRoute.post.should.have.been.calledWith(sinon.match.func, userController.authentication.signin);
    });

  });

});
