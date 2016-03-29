'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import * as aclModule from '../../../server/config/acl';
import mongooseModule from '../../../../core/server/app/mongoose';
import config from 'modernMean/config';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/config/acl.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return aclModule.default.should.be.an('object');
    });

    it('should export init', () => {
      return aclModule.init.should.be.a('function');
    });

    it('should export getAcl', () => {
      return aclModule.init.should.be.a('function');
    });

  });

});
