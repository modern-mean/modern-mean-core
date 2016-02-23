(function() {
  'use strict';

  describe('user.client.controller.settings.social.js', function () {

    var $scope,
      $rootScope,
      SocialAccountsController,
      Authentication,
      $httpBackend;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      _Authentication_.user = new _User_();
      SocialAccountsController = $controller('SocialAccountsController as vm', {
        $scope: $scope,
        Authentication: _Authentication_
      });

      $httpBackend = _$httpBackend_;
    }));

    describe('SocialAccountsController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property providers that is an array', function () {
          expect($scope.vm.providers).to.be.an('array');
          expect($scope.vm.providers.length).to.equal(6);
        });

        it('should have a property user that is an object', function () {
          expect($scope.vm.user).to.be.an('object');
        });

        it('should have a property remove that is a function', function () {
          expect($scope.vm.remove).to.be.an('function');
        });

        describe('remove()', function () {

          it('should set error and success to undefined', function () {
            $scope.vm.success = 'test';
            $scope.vm.error = 'test';
            $scope.vm.remove();

            expect($scope.vm.success).to.equal(undefined);
            expect($scope.vm.error).to.equal(undefined);
          });

          //TODO  Complete when server rework is done with JWT
        });

      });


    });
  });
})();
