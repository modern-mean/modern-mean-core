(function() {
  'use strict';

  describe('user.client.controller.authentication.social.js', function () {

    var $scope,
      $rootScope,
      $compile,
      SocialAuthenticationController,
      Authentication,
      $httpBackend,
      $state,
      $location,
      sandbox;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _$compile_, $controller, _Authentication_, _$httpBackend_, _$state_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;
      Authentication = _Authentication_;
      SocialAuthenticationController = $controller('SocialAuthenticationController as vm', {
        $scope: $scope,
      });
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });



    describe('SocialAuthenticationController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.callOauthProvider property that is a function', function () {
        expect($scope.vm.callOauthProvider).to.be.a('function');
      });

      describe('vm.callOauthProvider()', function () {

        beforeEach(inject(function(_$location_) {
          $location = _$location_;
        }));

        it('should redirect to a auth provider callback with no previous state', function () {
          var locationSpy = sandbox.spy($location, 'path');
          $scope.vm.callOauthProvider('testing');
          $rootScope.$digest();
          expect(locationSpy).to.have.been.calledWith('testing');
        });

        it('should redirect to a auth provider callback with previous state', function () {
          var locationSpy = sandbox.spy($location, 'path');
          $state.previous = { href: 'okie' };
          $scope.vm.callOauthProvider('testing');
          $rootScope.$digest();
          expect(locationSpy).to.have.been.calledWith('testing?redirect_to=okie');
        });



      });

      it('should have a vm.error property that is undefined', function () {
        expect($scope.vm.error).to.equal(undefined);
      });

    });

  });

})();
