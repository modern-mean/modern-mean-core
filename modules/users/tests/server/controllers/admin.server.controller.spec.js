'use strict';

import * as adminController from '../../../server/controllers/admin.server.controller';
import userModel from '../../../server/models/users.server.model.user';

let sandbox;

describe('/modules/users/server/controllers/admin.server.controller.js', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return userModel.init();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return adminController.default.should.be.an('object');
    });

    it('should export read', () => {
      return adminController.read.should.be.a('function');
    });

    describe('read()', () => {
      let mockReq, mockRes;

      beforeEach(() => {
        mockReq = {
          model: 'test'
        };
        mockRes = {
          json: sandbox.spy()
        };
        return adminController.read(mockReq, mockRes);
      });

      it('should return a user', () => {
        return mockRes.json.should.have.been.calledWith('test');
      });

    });

    it('should export update', () => {
      return adminController.update.should.be.a('function');
    });

    describe('update()', () => {
      let mockReq, mockRes, mockSave, model;

      describe('success', () => {

        beforeEach(() => {
          model = new userModel.getModels().user({
            name: {
              first: 'Test',
              last: 'Test'
            }
          });
          mockSave = sandbox.stub(model, 'save').resolves(model);
          mockReq = {
            model: model,
            body: {
              name: {
                first: 'Testa',
                last: 'Testb'
              }
            }
          };
          mockRes = {
            json: sandbox.spy()
          };
          return adminController.update(mockReq, mockRes);
        });

        it('should update the user', () => {
          model.name.last.should.be.equal('Testb');
          return model.name.first.should.be.equal('Testa');
        });

        it('should return the updated user', () => {
          return mockRes.json.should.have.been.calledWith(model);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          model = new userModel.getModels().user({
            name: {
              first: 'Test',
              last: 'Test'
            }
          });
          mockSave = sandbox.stub(model, 'save').rejects('Error!');
          mockReq = {
            model: model,
            body: {
              name: {
                first: 'Testa',
                last: 'Testb'
              }
            }
          };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.update(mockReq, mockRes);
        });

        it('should set the status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should respond with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export remove', () => {
      return adminController.remove.should.be.a('function');
    });

    describe('remove()', () => {
      let mockReq, mockRes, mockRemove, model;

      describe('success', () => {

        beforeEach(() => {
          model = new userModel.getModels().user({
            name: {
              first: 'Test',
              last: 'Test'
            }
          });
          mockRemove = sandbox.stub(model, 'remove').resolves(model);
          mockReq = {
            model: model
          };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.remove(mockReq, mockRes);
        });

        it('should call remove', () => {
          return mockRemove.should.be.have.been.called;
        });

        it('should respond with removed user', () => {
          return mockRes.json.should.be.have.been.calledWith(model);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          model = new userModel.getModels().user({
            name: {
              first: 'Test',
              last: 'Test'
            }
          });
          mockRemove = sandbox.stub(model, 'remove').rejects('Error!');
          mockReq = {
            model: model
          };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.remove(mockReq, mockRes);
        });

        it('should set the status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should respond with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export list', () => {
      return adminController.remove.should.be.a('function');
    });

    describe('list()', () => {
      let mockReq, mockRes, mockFind, model;

      describe('success', () => {

        beforeEach(() => {
          mockFind = sandbox.stub(userModel.getModels().user, 'find').resolves('test');
          mockReq = { };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.list(mockReq, mockRes);
        });

        it('should respond with users', () => {
          return mockRes.json.should.have.been.calledWith('test');
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockFind = sandbox.stub(userModel.getModels().user, 'find').rejects('Error!');
          mockReq = { };
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.list(mockReq, mockRes);
        });

        it('should set status to 400', () => {
          return mockRes.status.should.have.been.calledWith(400);
        });

        it('should respond with error', () => {
          return mockRes.json.should.have.been.calledWith('Error!');
        });

      });

    });

    it('should export userByID', () => {
      return adminController.userByID.should.be.a('function');
    });

    describe('userByID()', () => {
      let mockReq, mockRes, mockFind, mockNext;

      describe('success', () => {

        beforeEach(() => {
          mockFind = sandbox.stub(userModel.getModels().user, 'findById').resolves('test');
          mockReq = { };
          mockNext = sandbox.stub();
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };
          return adminController.userByID(mockReq, mockRes, mockNext, '56f43efed58a765f63e2ebd7');
        });

        it('should set the user to req.model', () => {
          return mockReq.model.should.be.equal('test');
        });

        it('should call next()', () => {
          return mockNext.should.have.been.called;
        });

      });

      describe('error', () => {

        beforeEach(() => {

          mockReq = { };
          mockNext = sandbox.stub();
          mockRes = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
          };

        });


        describe('mongoose failure', () => {

          beforeEach(() => {
            mockFind = sandbox.stub(userModel.getModels().user, 'findById').rejects('Error!');
            return adminController.userByID(mockReq, mockRes, mockNext, '56f43efed58a765f63e2ebd7');
          });

          it('should call next with the error', () => {
            return mockNext.should.have.been.calledWith('Error!');
          });

        });

        describe('user not found', () => {

          beforeEach(() => {
            mockFind = sandbox.stub(userModel.getModels().user, 'findById').resolves(null);
            return adminController.userByID(mockReq, mockRes, mockNext, '56f43efed58a765f63e2ebd7');
          });

          it('should call res.json with the error', () => {
            return mockNext.should.have.been.calledWith('Failed to load user 56f43efed58a765f63e2ebd7');
          });

        });

        describe('invalid Id', () => {

          beforeEach(() => {
            return adminController.userByID(mockReq, mockRes, mockNext, 'okie');
          });

          it('should set status to 400', () => {
            return mockRes.status.should.have.been.calledWith(400);
          });

          it('should set status to 400', () => {
            return mockRes.json.should.have.been.calledWith('User is invalid');
          });

        });

      });

    });

  });

});
