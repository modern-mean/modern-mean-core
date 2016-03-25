import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import fs from 'fs';
import * as profileFilter from '../../../server/config/profileUpload';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/config/profileUpload.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return profileFilter.default.should.be.an.object;
    });

    it('should export filter', () => {
      return profileFilter.filter.should.be.a.function;
    });

  });

});
