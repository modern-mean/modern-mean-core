'use strict';

import * as jwtToken from '../../../server/authentication/jwtToken';

let sandbox;

describe('/modules/users/server/authentication/jwtToken.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return jwtToken.default.should.be.an('object');
    });

    it('should export signToken', () => {
      return jwtToken.signToken.should.be.a('function');
    });

    describe('signToken()', () => {

      it('should reject a promise if user is not valid', () => {
        return jwtToken
                .signToken({ _id: 'okiedokie' })
                .then(token => {
                  return token.should.exist;
                });

      });

      it('should reject a promise if user is not valid', () => {
        return jwtToken
                .signToken({}).should.be.rejected;
      });

    });

  });

});
