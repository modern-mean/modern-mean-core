(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    HeaderController;

  describe('core.client.controller.header.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      HeaderToolbar = $controller('HeaderToolbar as vm', {
        $scope: $scope
      });
    }));

    describe('HeaderToolbar', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

    });
  });
})();
