import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import * as userModel from '../../../server/models/users.server.model.user';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/models/users.server.model.user.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return userModel.default.should.be.an('object');
    });

    it('should export init', () => {
      return userModel.init.should.be.a('function');
    });

    describe('init()', () => {

      it('should return a fullfilled promise', () => {
        return userModel.init().should.be.fulfilled;
      });

      it('should resolve an object of models', () => {
        return userModel.init().then(models => {
          models.user.should.be.a('function');
          models.provider.should.be.a('function');
          return models.email.should.be.an('function');
        });
      });

    });

    it('should export create', () => {
      return userModel.create.should.be.a('function');
    });

    describe('create()', () => {
      let mockReq, mockRes, mockNext;

      beforeEach(() => {
        mockReq = { };
        mockRes = { };
        mockNext = sandbox.stub();
        return userModel.create(mockReq, mockRes, mockNext);
      });

      it('should set req.model as a new user', () => {
        mockReq.model.should.be.an('object');
        return mockReq.model.name.should.be.an('object');
      });

      it('should call next()', () => {
        return mockNext.should.have.been.called;
      });

    });

    it('should export models', () => {
      return userModel.models.should.be.an('object');
    });

    it('should export getModels', () => {
      return userModel.getModels.should.be.a('function');
    });

    describe('getModels()', () => {

      it('should return models object', () => {
        return userModel.getModels().should.be.an('object');
      });

      it('should return models object with proper keys', () => {
        userModel.getModels().user.should.be.an('function');
        userModel.getModels().provider.should.be.an('function');
        return userModel.getModels().email.should.be.an('function');
      });

    });

  });

});
