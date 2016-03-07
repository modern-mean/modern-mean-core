(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    SideNavLeftController;

  describe('core.client.controller.sidenav.left.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      SideNavLeftController = $controller('SideNavLeftController as vm', {
        $scope: $scope
      });
    }));

    describe('SideNavLeftController', function () {
      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.close variable that is a function', function () {
        expect($scope.vm.close).to.be.a('function');
      });
    });
  });
})();
