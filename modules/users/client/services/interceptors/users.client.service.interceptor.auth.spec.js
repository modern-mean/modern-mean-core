(function() {
  'use strict';

  describe('users.client.service.interceptor.auth.js', function () {

    var $rootScope,
      User,
      $state,
      $httpBackend;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _User_, _$httpBackend_, _$state_) {
      $rootScope = _$rootScope_;
      User = new _User_();
      $httpBackend = _$httpBackend_;
      $state = _$state_;
    }));

    describe('Auth Interceptor', function () {

      it('should redirect to sign in on 401', function () {
        $httpBackend.expectGET('/api/users/me').respond(401);
        var stateSpy = chai.spy.on($state, 'transitionTo');
        User.$me();
        $rootScope.$digest();
        $httpBackend.flush();
        expect(stateSpy).to.have.been.called.with('authentication.signin');
      });

      it('should redirect to forbidden in on 403', function () {
        $httpBackend.expectGET('/api/users/me').respond(403);
        var stateSpy = chai.spy.on($state, 'transitionTo');
        User.$me();
        $rootScope.$digest();
        $httpBackend.flush();
        expect(stateSpy).to.have.been.called.with('forbidden');
      });

    });
  });
})();
