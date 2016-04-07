'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import mongoose from 'mongoose';
import * as authenticationController from '../../../../server/controllers/users/users.authentication.server.controller';
import jwtToken from '../../../../server/authentication/jwtToken';
import userModel from '../../../../server/models/users.server.model.user';
import aclModule from '../../../../server/config/acl';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/controllers/users/users.authentication.server.controller.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return userModel.init();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return authenticationController.default.should.be.an('object');
    });

    it('should export signin', () => {
      return authenticationController.signin.should.be.a('function');
    });

    describe('signin()', () => {
      let mockReq, mockRes, mockUser, mockAuth, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockReq = {
          user: user,
        };
        mockRes = {
          json: sandbox.spy(),
          status: sandbox.stub().returnsThis()
        };
      });


      describe('success', () => {

        beforeEach(() => {
          return authenticationController.signin(mockReq, mockRes);
        });

        it('should call res.json with a token', () => {
          expect(mockRes.json.args[0][0].token).to.exist;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockAuth = sandbox.stub(jwtToken, 'signToken').rejects('Error!');
          return authenticationController.signin(mockReq, mockRes);
        });

        it('should call respond with status 400', () => {
          mockRes.status.should.have.been.calledWith(400);
        });

        it('should call respond Error', () => {
          mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export signup', () => {
      return authenticationController.signup.should.be.a('function');
    });

    describe('signup()', () => {
      let mockReq, mockRes, mockUser, mockAuth, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();

        mockReq = {
          model: user,
          body: {
            name: {
              first: 'Fred',
              last: 'Flintstone'
            },
            email: 'asdf@test.com',
            password: 'asdf'
          }
        };

        mockRes = {
          json: sandbox.spy(),
          status: sandbox.stub().returnsThis()
        };
      });


      describe('success', () => {
        let aclMock, aclStub;

        beforeEach(() => {
          aclStub = {
            addUserRoles: sandbox.stub().resolves()
          };
          sandbox.stub(aclModule, 'getAcl').returns(aclStub);
          mockUser = sandbox.stub(user, 'save').resolves(user);
          return authenticationController.signup(mockReq, mockRes);
        });

        it('should call res.json with a token', () => {
          expect(mockRes.json.args[0][0].token).to.exist;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockUser = sandbox.stub(user, 'save').rejects('Error!');
          return authenticationController.signup(mockReq, mockRes);
        });

        it('should call respond with status 400', () => {
          mockRes.status.should.have.been.calledWith(400);
        });

        it('should call respond Error', () => {
          mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

  });

});
