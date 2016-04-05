(function() {
  'use strict';

  describe('user.client.controller.settings.picture.js', function () {

    var $scope,
      $rootScope,
      UsersPictureController,
      Authentication,
      $httpBackend;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      Authentication = _Authentication_;
      UsersPictureController = $controller('UsersPictureController as vm', {
        $scope: $scope
      });

      $httpBackend = _$httpBackend_;
    }));

    describe('UsersPictureController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property clear that is a function', function () {
          expect($scope.vm.clear).to.be.a('function');
        });

        describe('clear()', function () {

          it('should set file to undefined', function () {
            $scope.vm.file = 'test';
            $scope.vm.clear();
            expect($scope.vm.file).to.not.exist;
          });

        });

        it('should have a property save that is a function', function () {
          expect($scope.vm.save).to.be.a('function');
        });

        describe('save()', function () {

          it('should post to server and refresh user', function () {
            $httpBackend.expectPOST('/api/me/picture').respond(200, { message: 'Yippee' });
            $httpBackend.expectGET('/api/me').respond(200, { profileImageURL: 'test.png' });
            $scope.$digest();
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.file).to.not.exist;
            expect(Authentication.user.profileImageURL).to.equal('test.png');
          });

          it('should post to server and handle error', function () {
            $httpBackend.expectPOST('/api/me/picture').respond(400, { message: 'Oops' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

          });

        });

      });


    });
  });
})();
