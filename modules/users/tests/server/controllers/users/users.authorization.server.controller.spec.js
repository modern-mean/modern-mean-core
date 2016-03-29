'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import mongoose from 'mongoose';
import * as authorizationController from '../../../../server/controllers/users/users.authorization.server.controller';
import aclModule from '../../../../server/config/acl';
import userModel from '../../../../server/models/users.server.model.user';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/controllers/users/users.authorization.server.controller.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return userModel.init();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return authorizationController.default.should.be.an('object');
    });

    it('should export signin', () => {
      return authorizationController.read.should.be.a('function');
    });

    describe('read()', () => {
      let mockReq, mockRes, mockUser, mockAcl, aclStub, user, model;

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
          mockAcl = {
            userRoles: sandbox.stub().resolves(['user']),
            whatResources: sandbox.stub().resolves(['test'])
          };
          aclStub = sandbox.stub(aclModule, 'getAcl').returns(mockAcl);
          return authorizationController.read(mockReq, mockRes);
        });

        it('should call acl userRoles', () => {
          return mockAcl.userRoles.should.have.been.calledWith(user._id.toString());
        });

        it('should call acl whatResources', () => {
          return mockAcl.whatResources.should.have.been.calledWith(['user']);
        });

        it('should call res.json', () => {
          return mockRes.json.should.have.been.called;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockAcl = {
            userRoles: sandbox.stub().rejects('Error!')
          };
          aclStub = sandbox.stub(aclModule, 'getAcl').returns(mockAcl);
          return authorizationController.read(mockReq, mockRes);
        });

        it('should set status to 500', () => {
          return mockRes.status.should.have.been.calledWith(500);
        });

        it('should call res.json with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });


  });

});
