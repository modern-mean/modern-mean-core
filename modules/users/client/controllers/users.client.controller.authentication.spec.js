(function() {
  'use strict';

  describe('user.client.controller.authentication.js', function () {

    var $scope,
      $rootScope,
      AuthenticationController,
      Authentication,
      $httpBackend,
      $state,
      $location;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _$state_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      Authentication = _Authentication_;
      AuthenticationController = $controller('AuthenticationController as vm', {
        $scope: $scope
      });
    }));



    describe('AuthenticationController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.authentication property that is an object', function () {
        expect($scope.vm.authentication).to.be.an('object');
      });

      it('should have a vm.callOauthProvider property that is a function', function () {
        expect($scope.vm.callOauthProvider).to.be.a('function');
      });

      describe('vm.callOauthProvider()', function () {

        beforeEach(inject(function(_$location_) {
          $location = _$location_;
        }));

        it('should redirect to a auth provider callback with no previous state', function () {
          var locationSpy = chai.spy.on($location, 'path');
          $scope.vm.callOauthProvider('testing');
          $rootScope.$digest();
          expect(locationSpy).to.have.been.called.with('testing');
        });

        it('should redirect to a auth provider callback with previous state', function () {
          var locationSpy = chai.spy.on($location, 'path');
          $state.previous = { href: 'okie' };
          $scope.vm.callOauthProvider('testing');
          $rootScope.$digest();
          expect(locationSpy).to.have.been.called.with('testing?redirect_to=okie');
        });



      });

      it('should have a vm.error property that is undefined', function () {
        expect($scope.vm.error).to.equal(undefined);
      });

      it('should have a vm.popoverMsg property', function () {
        expect($scope.vm.popoverMsg).to.equal('Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.');
      });

      it('should have a vm.signup property that is a function', function () {
        expect($scope.vm.signup).to.be.a('function');
      });

      describe('vm.signup()', function () {

        afterEach(function () {
          Authentication.signout();
        });

        it('should set vm.error to undefined', function () {
          $scope.vm.error = 'test';
          $scope.vm.signup();
          expect($scope.vm.error).to.equal(undefined);
        });

        it('should signup a user', function () {
          $httpBackend.expectPOST('/api/auth/signup').respond(200, { token: 'testtoken', user: { id: 'testid' } });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signup();
          $scope.$digest();
          $httpBackend.flush();
          expect(Authentication.token).to.equal('testtoken');
          expect(Authentication.user.id).to.equal('testid');
        });

        it('should redirect on success', function () {
          var stateSpy = chai.spy.on($state, 'go');
          $httpBackend.expectPOST('/api/auth/signup').respond(200, { token: 'testtoken', user: { id: 'testid' } });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signup();
          $scope.$digest();
          $httpBackend.flush();
          expect(stateSpy).to.have.been.called();
        });

        it('should set vm.error an error signup fails', function () {
          $httpBackend.expectPOST('/api/auth/signup').respond(400, { message: 'Error Yo' });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signup();
          $scope.$digest();
          $httpBackend.flush();
          expect($scope.vm.error).to.equal('Error Yo');
        });

      });

      it('should have a vm.signin property that is a function', function () {
        expect($scope.vm.signin).to.be.a('function');
      });

      describe('vm.signin()', function () {

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
          $scope.vm.credentials = { email: 'test@awesome.com', password: 'test' };
          $scope.vm.signin();
          $scope.$digest();
          $httpBackend.flush();
          expect(Authentication.token).to.equal('testtoken');
          expect(Authentication.user.id).to.equal('testid');
        });

        it('should redirect on success', function () {
          var stateSpy = chai.spy.on($state, 'go');
          $httpBackend.expectPOST('/api/auth/signin').respond(200, { token: 'testtoken', user: { id: 'testid' } });
          $scope.vm.credentials = { email: 'test@awesome.com' };
          $scope.vm.signin();
          $scope.$digest();
          $httpBackend.flush();
          expect(stateSpy).to.have.been.called();
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
