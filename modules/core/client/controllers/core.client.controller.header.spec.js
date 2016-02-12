(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    Authentication,
    HeaderController;

  describe('core.client.controller.header.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _Authentication_, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      Authentication = _Authentication_;

      HeaderController = $controller('HeaderController as vm', {
        $scope: $scope
      });
    }));

    describe('HeaderController', function () {

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
