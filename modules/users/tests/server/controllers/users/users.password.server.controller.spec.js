'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import mongoose from 'mongoose';
import * as passwordController from '../../../../server/controllers/users/users.password.server.controller';
import userModel from '../../../../server/models/users.server.model.user';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/controllers/users/users.password.server.controller.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return userModel.init();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return passwordController.default.should.be.an('object');
    });

    it('should export changePassword', () => {
      return passwordController.changePassword.should.be.a('function');
    });


    describe('changePassword()', () => {
      let mockReq, mockRes, mockUser, user, provider;

      describe('success', () => {

        beforeEach(() => {
          user = new userModel.getModels().user();
          provider = new userModel.getModels().provider({
            type: 'local',
            email: 'test@test.com',
            clearpassword: 'test'
          });
          user.providers.push(provider);

          mockUser = sandbox.stub(user, 'save').resolves(user);

          mockReq = {
            user: user,
            body: {
              currentPassword: 'test',
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            }
          };
          mockRes = {
            json: sandbox.spy()
          };
          return passwordController.changePassword(mockReq, mockRes);
        });

        it('should change respond 200', () => {
          return mockRes.json.should.have.been.called;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          user = new userModel.getModels().user();
          provider = new userModel.getModels().provider({
            type: 'local',
            email: 'test@test.com',
            clearpassword: 'test'
          });
          user.providers.push(provider);

          mockUser = sandbox.stub(user, 'save').rejects('Error!');
          mockReq = {
            user: user,
            body: {
              currentPassword: 'test',
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            }
          };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
        });

        describe('password mismatch', () => {

          beforeEach(() => {
            mockReq.body = {
              newPassword: '@sdf1234',
              verifyPassword: '@sdf12345'
            };
            return passwordController.changePassword(mockReq, mockRes);
          });

          it('should set status with 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should respond with error', () => {
            return mockRes.json.should.have.been.calledWith('Passwords do not match');
          });

        });

        describe('authenticate failure', () => {

          beforeEach(() => {
            mockReq.body = {
              currentPassword: 'asdf',
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            };

            return passwordController.changePassword(mockReq, mockRes);
          });

          it('should set status with 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should respond with error', () => {
            return mockRes.json.should.have.been.calledWith('Current password is incorrect');
          });

        });

        describe('no local provider', () => {

          beforeEach(() => {
            mockReq.body = {
              currentPassword: 'asdf',
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            };
            mockReq.user.providers = [];
            return passwordController.changePassword(mockReq, mockRes);
          });

          it('should set status with 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should respond with error', () => {
            return mockRes.json.should.have.been.calledWith('No record of local provider');
          });

        });

        describe('mongoose failure', () => {

          beforeEach(() => {
            mockReq.body = {
              currentPassword: 'test',
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            };

            return passwordController.changePassword(mockReq, mockRes);
          });

          it('should set status with 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should respond with error', () => {
            return mockRes.json.should.have.been.calledWith('Error!');
          });

        });

      });

    });

  });

});
