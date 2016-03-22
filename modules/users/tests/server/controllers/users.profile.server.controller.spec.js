import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import mongoose from 'mongoose';
import lodash from 'lodash';
import * as profileController from '../../../server/controllers/users/users.profile.server.controller';
import userModel from '../../../server/models/users.server.model.user';


chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

describe('/modules/users/server/controllers/users/users.profile.server.controller.js', () => {

  beforeEach(() => {
    return userModel.init();
  });

  describe('export', () => {

    it('should export default', () => {
      return profileController.default.should.be.an.object;
    });

    it('should export changeProfilePicture', () => {
      return profileController.changeProfilePicture.should.be.a.function;
    });


    describe('changeProfilePicture()', () => {
      let mockReq, mockRes, mockUser, user, model;

      describe('success', () => {

        beforeEach(() => {
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').resolves(user);
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
            json: sinon.spy()
          };
          return profileController.changeProfilePicture(mockReq, mockRes);
        });

        afterEach(() => {
          mockUser.restore();
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
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').rejects('Error!');
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
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
          };
          return profileController.changeProfilePicture(mockReq, mockRes);
        });

        afterEach(() => {
          mockUser.restore();
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
      return profileController.me.should.be.a.function;
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
          json: sinon.spy()
        };
      });

      it('should return the logged in user', () => {
        profileController.me(mockReq, mockRes);
        return mockRes.json.should.have.been.calledWith(user);
      });

    });

    it('should export update', () => {
      return profileController.me.should.be.a.function;
    });

    describe('update()', () => {
      let mockReq, mockRes, mockUser, user, model, lodashSpy;

      describe('success', () => {
        beforeEach(() => {
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').resolves(user);
          mockReq = {
            user: user,
            body: {
              firstName: 'okie',
              roles: ['admin']
            }
          };
          mockRes = {
            json: sinon.stub()
          };
          lodashSpy = sinon.spy(lodash, 'extend');
          return profileController.update(mockReq, mockRes);
        });

        afterEach(() => {
          mockUser.restore();
          lodashSpy.restore();
        });

        it('should update the logged in user', () => {
          return mockUser.should.have.been.called;
        });

        it('should not update the user roles', () => {
          return expect(mockReq.body.roles).to.not.exist;
        });

        it('should merge the user with lodash.extend', () => {
          return lodashSpy.should.have.been.calledWith(user, mockReq.body);
        });

        it('should respond with logged in user', () => {
          return mockRes.json.should.have.been.called;
        });

      });

      describe('error', () => {
        beforeEach(() => {
          model = mongoose.model('User');
          user = new model();
          mockUser = sinon.stub(user, 'save').rejects('Error!');
          mockReq = {
            user: user,
            body: {
              firstName: 'okie',
              roles: ['admin']
            }
          };
          mockRes = {
            json: sinon.stub(),
            status: sinon.stub().returnsThis()
          };
          lodashSpy = sinon.spy(lodash, 'extend');
          return profileController.update(mockReq, mockRes);
        });

        afterEach(() => {
          mockUser.restore();
          lodashSpy.restore();
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
