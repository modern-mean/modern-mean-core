'use strict';

import mongoose from 'mongoose';
import lodash from 'lodash';
import * as profileController from '../../../../server/controllers/users/users.profile.server.controller';
import userModel from '../../../../server/models/users.server.model.user';

let sandbox;

describe('/modules/users/server/controllers/users/users.profile.server.controller.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return userModel.init();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return profileController.default.should.be.an('object');
    });

    it('should export addresses', () => {
      return profileController.me.should.be.a('function');
    });

    describe('addresses()', () => {
      let mockReq, mockRes, mockUser, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockUser = sandbox.stub(user, 'save');
        mockReq = {
          user: user,
          body: {
            addresses: [{ test: 'test' }]
          }
        };
        mockRes = {
          json: sandbox.spy(),
          status: sandbox.stub().returnsThis()
        };
      });

      describe('success', () => {

        beforeEach(() => {
          mockUser.resolves(user);
          return profileController.addresses(mockReq, mockRes);
        });

        it('should call user.save', () => {
          return mockUser.should.be.called;
        });

        it('should respond with the user', () => {
          return mockRes.json.should.be.calledWith(user);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockUser.rejects('Error!');
          return profileController.addresses(mockReq, mockRes);
        });

        it('should set status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should call res.json with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export changeProfilePicture', () => {
      return profileController.changeProfilePicture.should.be.a('function');
    });


    describe('changeProfilePicture()', () => {
      let mockReq, mockRes, mockUser, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockUser = sandbox.stub(user, 'save');
        mockReq = {
          user: user,
          file: {
            fieldname: 'newProfilePicture',
            originalname: 'whatever.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './public/img/profile/uploads/',
            filename: '56c287d70b9db2e01edf8ee2-1458594382467.png',
            path: 'public/img/profile/uploads/56c287d70b9db2e01edf8ee2-1458594382467.png',
            size: 61152
          }
        };
        mockRes = {
          json: sandbox.spy(),
          status: sandbox.stub().returnsThis()
        };
      });

      describe('success', () => {

        beforeEach(() => {
          mockUser.resolves(user);
          return profileController.changeProfilePicture(mockReq, mockRes);
        });

        it('should change the users profile picture', () => {
          user.profileImageURL.should.be.equal('./img/profile/uploads/56c287d70b9db2e01edf8ee2-1458594382467.png');
          return mockUser.should.have.been.called;
        });

        it('should respond with the user', () => {
          return mockRes.json.should.have.been.calledWith(user);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockUser.rejects('Error!');
          return profileController.changeProfilePicture(mockReq, mockRes);
        });

        it('should set status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should call res.json with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export emails', () => {
      return profileController.emails.should.be.a('function');
    });

    describe('emails()', () => {
      let mockReq, mockRes, mockUser, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockUser = sandbox.stub(user, 'save');
        mockReq = {
          user: user,
          body: {
            emails: [{ test: 'test' }]
          }
        };
        mockRes = {
          json: sandbox.spy(),
          status: sandbox.stub().returnsThis()
        };
      });

      describe('success', () => {

        beforeEach(() => {
          mockUser.resolves(user);
          return profileController.emails(mockReq, mockRes);
        });

        it('should call user.save', () => {
          return mockUser.should.be.called;
        });

        it('should respond with the user', () => {
          return mockRes.json.should.be.calledWith(user);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockUser.rejects('Error!');
          return profileController.emails(mockReq, mockRes);
        });

        it('should set status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should call res.json with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export me', () => {
      return profileController.me.should.be.a('function');
    });

    describe('me()', () => {
      let mockReq, mockRes, mockUser, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockReq = {
          user: user
        };
        mockRes = {
          json: sandbox.spy()
        };
      });

      it('should return the logged in user', () => {
        profileController.me(mockReq, mockRes);
        return mockRes.json.should.have.been.calledWith(user);
      });

    });

    it('should export update', () => {
      return profileController.me.should.be.a('function');
    });

    describe('update()', () => {
      let mockReq, mockRes, mockUser, user, model;

      beforeEach(() => {
        model = mongoose.model('User');
        user = new model();
        mockUser = sandbox.stub(user, 'save').resolves(user);
        mockReq = {
          user: user,
          body: {
            firstName: 'okie',
            roles: ['admin']
          }
        };
        mockRes = {
          json: sandbox.stub(),
          status: sandbox.stub().returnsThis()
        };

        return profileController.update(mockReq, mockRes);
      });

      describe('success', () => {
        beforeEach(() => {
          mockUser.resolves(user);
          return profileController.update(mockReq, mockRes);
        });

        it('should update the logged in user', () => {
          return mockUser.should.have.been.called;
        });

        it('should respond with logged in user', () => {
          return mockRes.json.should.have.been.called;
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockUser.rejects('Error!');
          return profileController.update(mockReq, mockRes);
        });

        it('should call res.status with 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should call res.json with Error!', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

  });

});
