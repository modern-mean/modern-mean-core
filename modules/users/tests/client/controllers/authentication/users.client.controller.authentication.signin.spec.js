(function() {
  'use strict';

  describe('user.client.controller.authentication.signin.js', function () {

    var $scope,
      $rootScope,
      $compile,
      SigninAuthenticationController,
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
      SigninAuthenticationController = $controller('SigninAuthenticationController as vm', {
        $scope: $scope,
      });
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });



    describe('SigninAuthenticationController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.authentication property that is an object', function () {
        expect($scope.vm.authentication).to.be.an('object');
      });

      it('should have a vm.error property that is undefined', function () {
        expect($scope.vm.error).to.equal(undefined);
      });

      describe('vm.signin()', function () {

        beforeEach(function () {
          $compile('<form name="vm.forms.signIn"></form>')($scope);
        });

        afterEach(function () {
          Authentication.signout();
        });

        it('should set vm.error to undefined', function () {
          $scope.vm.error = 'test';
          $scope.vm.signin();
          expect($scope.vm.error).to.equal(undefined);
        });

        it('should signin a user', function () {
          $httpBackend.expectPOST('/api/auth/signin').respond(200, { token: 'testtoken', user: { id: 'testid' } });
          $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
          $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
          $scope.vm.credentials = { email: 'test@awesome.com', password: 'test' };
          $scope.vm.signin();
          $scope.$digest();
          $httpBackend.flush();
          expect(Authentication.token).to.equal('testtoken');
          expect(Authentication.user.id).to.equal('testid');
          expect(Authentication.authorization.roles).to.contain('surething');
        });

        it('should redirect on success', function () {
          var stateSpy = sandbox.spy($state, 'go');
          $httpBackend.expectPOST('/api/auth/signin').respond(200, { token: 'testtoken', user: { id: 'testid' } });
          $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
          $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signin();
          $scope.$digest();
          $httpBackend.flush();
          expect(stateSpy).to.have.been.called;
        });

        it('should set vm.error an error signup fails', function () {
          $httpBackend.expectPOST('/api/auth/signin').respond(400, { message: 'Error Yo' });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signin();
          $scope.$digest();
          $httpBackend.flush();
          expect($scope.vm.error).to.equal('Error Yo');
        });

      });

    });
  });
})();
