import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import mongoose from 'mongoose';
import * as passwordController from '../../../server/controllers/users/users.password.server.controller';
import userModel from '../../../server/models/users.server.model.user';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

describe('/modules/users/server/controllers/users/users.password.server.controller.js', () => {

  beforeEach(() => {
    return userModel.init();
  });

  describe('export', () => {

    it('should export default', () => {
      return passwordController.default.should.be.an.object;
    });

    it('should export changePassword', () => {
      return passwordController.changePassword.should.be.a.function;
    });


    describe('changePassword()', () => {
      let mockReq, mockRes, mockUser, mockAuth, user, model;

      describe('success', () => {

        beforeEach(() => {
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').resolves(user);
          mockAuth = sinon.stub(user, 'authenticate').returns(true);
          mockReq = {
            user: user,
            body: {
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            }
          };
          mockRes = {
            json: sinon.spy()
          };
          return passwordController.changePassword(mockReq, mockRes);
        });

        afterEach(() => {
          mockUser.restore();
          mockAuth.restore();
        });

        it('should change respond 200', () => {
          return mockRes.json.should.have.been.called;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').rejects('Error!');
          mockReq = {
            user: user
          };
          mockRes = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
          };
        });

        afterEach(() => {
          mockUser.restore();
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
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            };
            mockAuth = sinon.stub(user, 'authenticate').returns(false);
            return passwordController.changePassword(mockReq, mockRes);
          });

          afterEach(() => {
            mockAuth.restore();
          });

          it('should set status with 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should respond with error', () => {
            return mockRes.json.should.have.been.calledWith('Current password is incorrect');
          });

        });

        describe('mongoose failure', () => {

          beforeEach(() => {
            mockReq.body = {
              newPassword: '@sdf1234',
              verifyPassword: '@sdf1234'
            };
            mockAuth = sinon.stub(user, 'authenticate').returns(true);
            return passwordController.changePassword(mockReq, mockRes);
          });

          afterEach(() => {
            mockAuth.restore();
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
