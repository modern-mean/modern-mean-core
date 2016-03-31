(function() {
  'use strict';

  describe('users.client.config.authinterceptor.js', function () {

    var $httpProvider;

    beforeEach(function () {
      module('users', function (_$httpProvider_) {
        $httpProvider = _$httpProvider_;
      });
      inject();
    });

    it('should add an auth interceptor', function () {
      console.log(JSON.stringify($httpProvider));
      expect($httpProvider.interceptors.indexOf('authInterceptor')).to.not.equal(-1);
    });

  });
})();
