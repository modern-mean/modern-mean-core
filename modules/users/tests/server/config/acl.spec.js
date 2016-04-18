'use strict';

import * as aclModule from '../../../server/config/acl';
import mongooseModule from '../../../../core/server/app/mongoose';
import config from 'modernMean/config';

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
