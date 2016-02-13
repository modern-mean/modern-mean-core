(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    Authentication,
    SideNavController;

  describe('core.client.controller.sidenav.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _Authentication_, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      Authentication = _Authentication_;

      SideNavController = $controller('SideNavController as vm', {
        $scope: $scope
      });
    }));

    describe('SideNavController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.accountMenu variable', function () {
        expect($scope.vm.accountMenu).to.be.an('object');
      });

      it('should have a vm.authentication variable', function () {
        expect($scope.vm.authentication).to.be.an('object');
      });

      it('should have a vm.menu variable', function () {
        expect($scope.vm.menu).to.be.an('object');
      });

    });
  });
})();
