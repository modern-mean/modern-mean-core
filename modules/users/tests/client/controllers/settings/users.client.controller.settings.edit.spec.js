(function() {
  'use strict';

  describe('user.client.controller.settings.edit.js', function () {

    var $scope,
      $rootScope,
      EditProfileController,
      Authentication,
      $httpBackend,
      User;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_) {
      $rootScope = _$rootScope_;
      Authentication = _Authentication_;
      User = _User_;
      $scope = $rootScope.$new();


      EditProfileController = $controller('EditProfileController as vm', {
        $scope: $scope,
        Authentication: Authentication
      });

      //console.log(JSON.stringify(Authentication.user));
      $httpBackend = _$httpBackend_;
    }));

    describe('EditProfileController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property update that is a function', function () {
          expect($scope.vm.update).to.be.an('function');
        });

        describe('update()', function () {
          it('should set error and success to undefined', function () {
            $scope.vm.success = 'test';
            $scope.vm.error = 'test';
            $scope.vm.update();

            expect($scope.vm.success).to.equal(undefined);
            expect($scope.vm.error).to.equal(undefined);
          });

          it('should put to server and handle success', function () {
            $httpBackend.expectPUT('/api/me').respond(200, { message: 'Yippee' });
            $scope.$digest();
            $scope.vm.update();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.success).to.equal('Yippee');
          });

          it('should put to server and handle error', function () {
            $httpBackend.expectPUT('/api/me').respond(400, { message: 'Oops' });
            $scope.vm.update();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.error).to.equal('Oops');
          });
        });

      });


    });
  });
})();
