(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    SideNavRightController;

  describe('core.client.controller.sidenav.right.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      SideNavRightController = $controller('SideNavRightController as vm', {
        $scope: $scope
      });
    }));

    describe('SideNavRightController', function () {
      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.close variable that is a function', function () {
        expect($scope.vm.close).to.be.a('function');
      });
    });
  });
})();
