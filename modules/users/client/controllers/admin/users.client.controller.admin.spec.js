(function() {
  'use strict';

  describe('user.client.controller.admin.js', function () {

    var $scope,
      $rootScope,
      UserListController,
      $httpBackend,
      $state,
      mockUserAdminResource;

    beforeEach(module('users.admin'));

    beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _$state_, _UserAdmin_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      mockUserAdminResource = new _UserAdmin_({ _id: 'testuser' });

      UserListController = $controller('UserController as vm', {
        $scope: $scope,
        userResolve: mockUserAdminResource
      });

    }));

    describe('UserController', function () {

      describe('vm', function () {
        it('should be an object', function () {
          expect($scope.vm).to.be.an('object');
        });

        it('should have a property remove that is a function', function () {
          expect($scope.vm.remove).to.be.a('function');
        });

        it('should have a property update that is a function', function () {
          expect($scope.vm.update).to.be.a('function');
        });

        it('should have a property user that is an object', function () {
          expect($scope.vm.user).to.be.a('object');
        });

        it('should have a property user that has an id', function () {
          expect($scope.vm.user._id).to.equal('testuser');
        });
      });

      describe('vm.remove', function () {

        it('should call the server to delete and redirect on success', function () {
          $httpBackend.expectDELETE('/api/admin/users/testuser').respond(200, {});
          var stateSpy = chai.spy.on($state, 'go');
          $scope.vm.remove();
          $scope.$digest();
          $httpBackend.flush();

          expect(stateSpy).to.have.been.called.with('admin.users');
        });

        it('should call the server to delete set an error on error', function () {
          $httpBackend.expectDELETE('/api/admin/users/testuser').respond(400, { message: 'Error Yo' });
          $scope.vm.remove();
          $scope.$digest();
          $httpBackend.flush();

          expect($scope.vm.error).to.equal('Error Yo');
        });

      });

      describe('vm.update', function () {

        it('should call the server to update and redirect on success', function () {
          $httpBackend.expectPUT('/api/admin/users/testuser').respond(200, { _id: 'testuser' });
          var stateSpy = chai.spy.on($state, 'go');
          $scope.vm.update();
          $scope.$digest();
          $httpBackend.flush();

          expect(stateSpy).to.have.been.called.with('admin.user', { userId: 'testuser' });
        });

        it('should call the server to edit set an error on error', function () {
          $httpBackend.expectPUT('/api/admin/users/testuser').respond(400, { message: 'Error Yo' });
          $scope.vm.update();
          $scope.$digest();
          $httpBackend.flush();

          expect($scope.vm.error).to.equal('Error Yo');
        });

      });


    });
  });
})();
