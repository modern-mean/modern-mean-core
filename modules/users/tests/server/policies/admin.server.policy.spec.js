'use strict';

import * as adminPolicy from '../../../server/policies/admin.server.policy';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('/modules/users/server/policies/admin.server.policy.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return adminPolicy.default.should.be.an('object');
    });

    it('should export policy', () => {
      return adminPolicy.policy.should.be.a('function');
    });

    describe('policy()', () => {

      describe('success', () => {
        let aclStub, mockAcl, promise;

        beforeEach(() => {
          mockAcl = {
            allow: sandbox.stub().resolves()
          };
          aclStub = sandbox.stub(aclModule, 'getAcl').returns(mockAcl);
          promise = adminPolicy.policy();
          return promise;
        });

        it('should resolve a promise', () => {
          return promise.should.be.fulfilled;
        });

        it('should call acl allow', () => {
          return mockAcl.allow.should.have.been.calledWith([{
            roles: ['admin'],
            allows: [{
              resources: '/api/users',
              permissions: '*'
            }]
          }]);
        });

      });

      describe('error', () => {
        let aclStub, mockAcl;

        beforeEach(() => {
          mockAcl = {
            allow: sandbox.stub().rejects('Error!')
          };
          return aclStub = sandbox.stub(aclModule, 'getAcl').returns(mockAcl);

        });

        it('should reject a promise', () => {
          return adminPolicy.policy().should.be.rejectedWith('Error!');
        });

      });

    });

  });

});
