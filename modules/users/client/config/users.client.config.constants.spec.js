(function() {
  'use strict';

  describe('users.client.config.constants.js', function () {
    var constants;

    beforeEach(module('users'));

    beforeEach(inject(function(_AUTH_EVENTS_) {
      constants = _AUTH_EVENTS_;
    }));

    it('should be an object', function () {
      expect(constants).to.be.an('object');
    });

    it('should have a property called loginSuccess', function () {
      expect(constants.loginSuccess).to.exist;
      expect(constants.loginSuccess).to.equal(window.modernMeanApplication.name + '-auth-login-success');
    });

    it('should have a property called loginFailed', function () {
      expect(constants.loginFailed).to.exist;
      expect(constants.loginFailed).to.equal(window.modernMeanApplication.name + 'auth-login-failed');
    });

    it('should have a property called logoutSuccess', function () {
      expect(constants.logoutSuccess).to.exist;
      expect(constants.logoutSuccess).to.equal(window.modernMeanApplication.name + 'auth-logout-success');
    });

  });
})();
