(function() {
  'use strict';

  describe('user.client.service.authentication.js', function () {

    var $rootScope,
      Authentication,
      $httpBackend,
      User,
      $state,
      $http,
      AUTH_EVENTS,
      $window,
      $location;





    describe('Authentication Initialization', function () {

      describe('token in storage', function () {
        var broadcastSpy;

        beforeEach(function () {
          localStorage.setItem('token', 'testtoken');
          module('users');
        });

        beforeEach(inject(function(_$rootScope_, _$httpBackend_, _AUTH_EVENTS_, _$http_, _Authentication_) {
          $rootScope = _$rootScope_;
          $httpBackend = _$httpBackend_;
          AUTH_EVENTS = _AUTH_EVENTS_;
          $http = _$http_;
          Authentication = _Authentication_;
          broadcastSpy = chai.spy.on($rootScope, '$broadcast');
          $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
          $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
          $rootScope.$digest();
          $httpBackend.flush();
        }));

        afterEach(function () {
          localStorage.removeItem('token');
          Authentication.user = undefined;
          Authentication.token = undefined;
        });

        it('should set user property', function () {
          expect(Authentication.user).to.be.an('object');
          expect(Authentication.user.id).to.equal('testid');
        });

        it('should set token property', function () {
          expect(Authentication.token).to.equal('testtoken');
        });

        it('should set token in local storage', function () {
          expect(localStorage.getItem('token')).to.equal('testtoken');
        });

        it('should set authorization header in $http', function () {
          expect($http.defaults.headers.common.Authorization).to.equal('JWT testtoken');
        });

        it('should broadcast login event', function () {
          expect(broadcastSpy).to.have.been.called.with(AUTH_EVENTS.loginSuccess);
        });
      });

      describe('token on URL', function () {
        var broadcastSpy;

        beforeEach(module('users'));

        //This is needed to ad a ?token=testtoken to the location service before instantiation
        beforeEach(module(function ($provide) {
          $provide.decorator('$location', function ($delegate) {
            $delegate.search('token', 'testtoken');
            return $delegate;
          });
        }));


        beforeEach(inject(function(_$rootScope_, _$httpBackend_, _AUTH_EVENTS_, _$http_, _$location_, _Authentication_) {
          $location = _$location_;
          $rootScope = _$rootScope_;
          $httpBackend = _$httpBackend_;
          AUTH_EVENTS = _AUTH_EVENTS_;
          $http = _$http_;
          Authentication = _Authentication_;

          broadcastSpy = chai.spy.on($rootScope, '$broadcast');
          $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
          $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
          $rootScope.$digest();
          $httpBackend.flush();
        }));

        afterEach(function () {
          localStorage.removeItem('token');
          Authentication.user = undefined;
          Authentication.token = undefined;
        });

        it('should set user property', function () {
          expect(Authentication.user).to.be.an('object');
          expect(Authentication.user.id).to.equal('testid');
        });

        it('should set token property', function () {
          expect(Authentication.token).to.equal('testtoken');
        });

        it('should set token in local storage', function () {
          expect(localStorage.getItem('token')).to.equal('testtoken');
        });

        it('should remove token from URL', function () {
          expect($location.search().token).to.equal(undefined);
        });

        it('should set authorization header in $http', function () {
          expect($http.defaults.headers.common.Authorization).to.equal('JWT testtoken');
        });

        it('should broadcast login event', function () {
          expect(broadcastSpy).to.have.been.called.with(AUTH_EVENTS.loginSuccess);
        });
      });

    });

    describe('AuthenticationService', function () {

      beforeEach(module('users'));

      beforeEach(inject(function(_$rootScope_, _Authentication_, _User_, _$state_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        Authentication = _Authentication_;
        User = _User_;
        $state = _$state_;
        $httpBackend = _$httpBackend_;
      }));

      it('should be an object', function () {
        expect(Authentication).to.be.an('object');
      });

      it('should have a changePassword property that is a function', function () {
        expect(Authentication.changePassword).to.be.a('function');
      });

      describe('changePassword', function () {
        it('should post to the server to change password and return a promise', function () {
          $httpBackend.expectPOST('/api/me/password').respond(200, { message: 'Yippee' });
          var response = Authentication.changePassword({});
          $rootScope.$digest();
          $httpBackend.flush();


          expect(response).to.be.an('object');
          expect(response.$promise).to.be.an('object');
          expect(response.$promise.then).to.be.a('function');
        });
      });

      it('should have a forgotPassword property that is a function', function () {
        expect(Authentication.forgotPassword).to.be.an('function');
      });

      describe('forgotPassword', function () {
        it('should post to the server to forgot password and return a promise', function () {
          $httpBackend.expectPOST('/api/auth/forgot').respond(200, { message: 'Yippee' });
          var response = Authentication.forgotPassword({});
          $httpBackend.flush();

          expect(response).to.be.an('object');
          expect(response.$promise).to.be.an('object');
          expect(response.$promise.then).to.be.a('function');
        });
      });

      it('should have a passwordReset property that is a function', function () {
        expect(Authentication.passwordReset).to.be.an('function');
      });

      describe('passwordReset', function () {
        it('should post to the server to reset password and return a promise', function () {
          $httpBackend.expectPOST('/api/auth/reset').respond(200, { message: 'Yippee' });
          var response = Authentication.passwordReset({});
          $httpBackend.flush();

          expect(response).to.be.an('object');
          expect(response.$promise).to.be.an('object');
          expect(response.$promise.then).to.be.a('function');
        });
      });

      it('should have a signout property that is a function', function () {
        expect(Authentication.signout).to.be.a('function');
      });

      describe('signout', function () {
        var broadcastSpy;

        beforeEach(inject(function (_AUTH_EVENTS_, _$http_) {
          broadcastSpy = chai.spy.on($rootScope, '$broadcast');
          AUTH_EVENTS = _AUTH_EVENTS_;
          $http = _$http_;

          Authentication.signout();
        }));

        it('should remove local storage token', function () {
          expect(localStorage.getItem('token')).to.equal(null);
        });

        it('should set service user property to undefined', function () {
          expect(Authentication.user).to.equal(undefined);
        });

        it('should set service token property to undefined', function () {
          expect(Authentication.token).to.equal(undefined);
        });

        it('should set $http Authorization header to undefined', function () {
          expect($http.defaults.headers.common.Authorization).to.equal(undefined);
        });

        it('should set broadcast signout event', function () {
          expect(broadcastSpy).to.have.been.called.with(AUTH_EVENTS.logoutSuccess);
        });

      });

      it('should have a signin property that is a function', function () {
        expect(Authentication.signin).to.be.a('function');
      });

      describe('signin()', function () {

        describe('on error', function () {
          var result;

          beforeEach(inject(function (_$http_) {
            $http = _$http_;

            $httpBackend.expectPOST('/api/auth/signin').respond(400, { token: 'testtoken', user: { id: 'testid' } });
            result = Authentication.signin();
            $httpBackend.flush();
          }));

          it('should return a promise', function () {
            expect(result.then).to.be.a('function');
          });

          it('should not set user property', function () {
            expect(Authentication.user._id).to.equal(undefined);
          });

          it('should not set authorization property', function () {
            expect(Authentication.authorization.roles).to.equal(undefined);
          });

          it('should not set token property', function () {
            expect(Authentication.token).to.equal(undefined);
          });

          it('should not set token in local storage', function () {
            expect(localStorage.getItem('token')).to.equal(null);
          });

          it('should not set authorization header in $http', function () {
            expect($http.defaults.headers.common.Authorization).to.equal(undefined);
          });

        });

        describe('on success', function () {
          var result,
            broadcastSpy;

          beforeEach(inject(function (_AUTH_EVENTS_, _$http_) {
            broadcastSpy = chai.spy.on($rootScope, '$broadcast');
            AUTH_EVENTS = _AUTH_EVENTS_;
            $http = _$http_;

            $httpBackend.expectPOST('/api/auth/signin').respond(200, { token: 'testtoken' });
            $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
            $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
            result = Authentication.signin();
            $httpBackend.flush();
          }));

          afterEach(function () {
            Authentication.signout();
          });

          it('should return a promise', function () {
            expect(result.then).to.be.a('function');
          });

          it('should set user property', function () {
            expect(Authentication.user).to.be.an('object');
            expect(Authentication.user.id).to.equal('testid');
          });

          it('should set authorization property', function () {
            expect(Authentication.authorization).to.be.an('object');
            expect(Authentication.authorization.roles).to.contain('surething');
          });

          it('should set token property', function () {
            expect(Authentication.token).to.equal('testtoken');
          });

          it('should set token in local storage', function () {
            expect(localStorage.getItem('token')).to.equal('testtoken');
          });

          it('should set authorization header in $http', function () {
            expect($http.defaults.headers.common.Authorization).to.equal('JWT testtoken');
          });

          it('should broadcast login event', function () {
            expect(broadcastSpy).to.have.been.called.with(AUTH_EVENTS.loginSuccess);
          });
        });

      });

      describe('signup()', function () {

        describe('on error', function () {
          var result;

          beforeEach(inject(function (_$http_) {
            $http = _$http_;

            $httpBackend.expectPOST('/api/auth/signup').respond(400, { token: 'testtoken', user: { id: 'testid' } });
            result = Authentication.signup();
            $httpBackend.flush();
          }));

          it('should return a promise', function () {
            expect(result.then).to.be.a('function');
          });

          it('should not set user property', function () {
            expect(Authentication.user._id).to.equal(undefined);
          });

          it('should not set authorization property', function () {
            expect(Authentication.authorization.roles).to.equal(undefined);
          });

          it('should not set token property', function () {
            expect(Authentication.token).to.equal(undefined);
          });

          it('should not set token in local storage', function () {
            expect(localStorage.getItem('token')).to.equal(null);
          });

          it('should not set authorization header in $http', function () {
            expect($http.defaults.headers.common.Authorization).to.equal(undefined);
          });

        });

        describe('on success', function () {
          var result,
            broadcastSpy;

          beforeEach(inject(function (_AUTH_EVENTS_, _$http_) {
            broadcastSpy = chai.spy.on($rootScope, '$broadcast');
            AUTH_EVENTS = _AUTH_EVENTS_;
            $http = _$http_;

            $httpBackend.expectPOST('/api/auth/signup').respond(200, { token: 'testtoken', user: { id: 'testid' } });
            $httpBackend.expectGET('/api/me').respond(200, { id: 'testid' });
            $httpBackend.expectGET('/api/me/authorization').respond(200, { roles: ['surething'] });
            result = Authentication.signup();
            $httpBackend.flush();
          }));

          afterEach(function () {
            Authentication.signout();
          });

          it('should return a promise', function () {
            expect(result.then).to.be.a('function');
          });

          it('should set user property', function () {
            expect(Authentication.user).to.be.an('object');
            expect(Authentication.user.id).to.equal('testid');
          });

          it('should set authorization property', function () {
            expect(Authentication.authorization).to.be.an('object');
            expect(Authentication.authorization.roles).to.contain('surething');
          });

          it('should set token property', function () {
            expect(Authentication.token).to.equal('testtoken');
          });

          it('should set token in local storage', function () {
            expect(localStorage.getItem('token')).to.equal('testtoken');
          });

          it('should set authorization header in $http', function () {
            expect($http.defaults.headers.common.Authorization).to.equal('JWT testtoken');
          });

          it('should broadcast login event', function () {
            expect(broadcastSpy).to.have.been.called.with(AUTH_EVENTS.loginSuccess);
          });
        });

      });
    });
  });
})();
