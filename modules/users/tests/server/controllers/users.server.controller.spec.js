import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import * as userController from '../../../server/controllers/users.server.controller';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/controllers/users/users.server.controller.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return userController.default.should.be.an('object');
    });

    it('should export authentication', () => {
      return userController.authentication.should.be.an('object');
    });

    it('should export password', () => {
      return userController.password.should.be.an('object');
    });

    it('should export profile', () => {
      return userController.profile.should.be.an('object');
    });

  });

});
