(function() {
  'use strict';

  describe('user.client.controller.settings.picture.js', function () {

    var $scope,
      $rootScope,
      ChangeProfilePictureController,
      Authentication,
      $httpBackend;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      Authentication = _Authentication_;
      ChangeProfilePictureController = $controller('ChangeProfilePictureController as vm', {
        $scope: $scope
      });

      $httpBackend = _$httpBackend_;
    }));

    describe('ChangeProfilePictureController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property upload that is a function', function () {
          expect($scope.vm.upload).to.be.an('function');
        });

        describe('upload()', function () {

          it('should set error and success to undefined', function () {
            $scope.vm.success = 'test';
            $scope.vm.error = 'test';
            $scope.vm.upload();

            expect($scope.vm.success).to.equal(undefined);
            expect($scope.vm.error).to.equal(undefined);
          });

          it('should post to server and refresh user', function () {
            $httpBackend.expectPOST('/api/me/picture').respond(200, { message: 'Yippee' });
            $httpBackend.expectGET('/api/me').respond(200, { profileImageURL: 'test.png' });
            $scope.$digest();
            $scope.vm.upload();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.success).to.equal('Yippee');
            expect(Authentication.user.profileImageURL).to.equal('test.png');
          });

          it('should post to server and handle error', function () {
            $httpBackend.expectPOST('/api/me/picture').respond(400, { message: 'Oops' });
            $scope.vm.upload();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.error).to.equal('Oops');
          });

        });

      });


    });
  });
})();
