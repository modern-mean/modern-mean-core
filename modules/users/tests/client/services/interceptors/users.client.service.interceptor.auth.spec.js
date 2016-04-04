(function() {
  'use strict';

  describe('users.client.service.interceptor.auth.js', function () {

    var $rootScope,
      Authentication,
      $state,
      $httpBackend,
      sandbox;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _Authentication_, _$httpBackend_, _$state_) {
      $rootScope = _$rootScope_;
      Authentication = _Authentication_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('Auth Interceptor', function () {

      it('should redirect to sign in on 401', function () {
        $httpBackend.expectGET('/api/me').respond(401);
        var stateSpy = sandbox.spy($state, 'transitionTo');
        Authentication.user.$get();
        $rootScope.$digest();
        $httpBackend.flush();
        expect(stateSpy).to.have.been.calledWith('root.user.authentication.signin');
      });

      it('should redirect to forbidden in on 403', function () {
        $httpBackend.expectGET('/api/me').respond(403);
        var stateSpy = sandbox.spy($state, 'transitionTo');
        Authentication.user.$get();
        $rootScope.$digest();
        $httpBackend.flush();
        expect(stateSpy).to.have.been.calledWith('root.forbidden');
      });

    });
  });
})();
