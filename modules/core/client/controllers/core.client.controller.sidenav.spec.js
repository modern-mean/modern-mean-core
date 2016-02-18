(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    SideNavController;

  describe('core.client.controller.sidenav.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      SideNavController = $controller('SideNavController as vm', {
        $scope: $scope
      });
    }));

    describe('SideNavController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.menu variable', function () {
        expect($scope.vm.menus).to.be.an('array');
      });

    });
  });
})();
