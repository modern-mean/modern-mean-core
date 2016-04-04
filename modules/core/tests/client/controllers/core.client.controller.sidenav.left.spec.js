(function() {
  'use strict';

  var $state,
    $scope,
    $compile,
    $rootScope,
    SideNavLeftController;

  describe('core.client.controller.sidenav.left.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$compile_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;
      SideNavLeftController = $controller('SideNavLeftController as vm', {
        $scope: $scope
      });

    }));

    describe('SideNavLeftController', function () {
      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.navigation variable that is an instance of mdSidenav', function () {
        var element = $compile('<md-sidenav md-component-id="coreLeftNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($scope);
        $scope.$digest();
        return expect($scope.vm.navigation).to.be.an('object');
      });

    });
  });
})();
