(function() {
  'use strict';

  describe('user.client.controller.settings.password.js', function () {

    var $scope,
      $rootScope,
      ChangePasswordController,
      Authentication,
      $httpBackend;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      ChangePasswordController = $controller('ChangePasswordController as vm', {
        $scope: $scope
      });
      Authentication = _Authentication_;
      $httpBackend = _$httpBackend_;
    }));

    describe('ChangePasswordController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property changeUserPassword that is a function', function () {
          expect($scope.vm.changeUserPassword).to.be.an('function');
        });

        describe('changeUserPassword', function () {
          it('should set error and success to undefined', function () {
            $scope.vm.success = 'test';
            $scope.vm.error = 'test';
            $scope.vm.changeUserPassword();

            expect($scope.vm.success).to.equal(undefined);
            expect($scope.vm.error).to.equal(undefined);
          });

          it('should post to server and handle success', function () {
            $httpBackend.expectPOST('/api/users/password').respond(200, { message: 'Yippee' });
            $scope.vm.changeUserPassword();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.success).to.equal('Yippee');
            expect($scope.vm.passwordDetails).to.equal(undefined);
          });

          it('should post to server and handle error', function () {
            $httpBackend.expectPOST('/api/users/password').respond(400, { message: 'Oops' });
            $scope.vm.changeUserPassword();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.error).to.equal('Oops');
            expect($scope.vm.passwordDetails).to.equal(undefined);
          });
        });

      });


    });
  });
})();
