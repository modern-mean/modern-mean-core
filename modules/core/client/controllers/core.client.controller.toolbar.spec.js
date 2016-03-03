(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    HeaderController;

  describe('core.client.controller.toolbar.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      ToolbarController = $controller('ToolbarController as vm', {
        $scope: $scope
      });
    }));

    describe('ToolbarController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

    });
  });
})();
