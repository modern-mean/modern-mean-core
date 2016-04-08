(function() {
  'use strict';

  describe('user.client.controller.admin.list.js', function () {

    var $scope,
      $rootScope,
      UserListController,
      $httpBackend;

    beforeEach(module('users.admin'));

    beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      UserListController = $controller('UserListController as vm', {
        $scope: $scope
      });
    }));

    describe('UserListController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should make a call to get a list of users', function () {
        $httpBackend.expectGET('/api/users').respond(200, [ { id: 'testuser' }, { id: 'testuser2' } ]);
        $scope.$digest();
        $httpBackend.flush();
        expect($scope.vm.users).to.be.an('array');
        expect($scope.vm.users.length).to.equal(2);
      });
    });
  });
})();
