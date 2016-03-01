(function() {
  'use strict';

  var $scope,
    $rootScope,
    SideNavLeftController;

  describe('core.client.controller.sidenav.left.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_Authentication_, _menuService_,_$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      SideNavLeftController = $controller('SideNavLeftController as vm', {
        $scope: $scope
      });
    }));

    describe('SideNavLeftController', function () {

      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.menu variable that is an array', function () {
        expect($scope.vm.menus).to.be.an('array');
      });

      it('vm has a property close that is a function', function () {
        var menuSpy = chai.spy.on($mdSidenav, 'close')

        scope.vm.close('left')

        expect(menuSpy).to.have.been.called.with('left');
      });
    });
  });
})();
