(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    $compile,
    UserRightNavController;

  describe('users.client.controller.menus.rightnav.js', function () {

    beforeEach(module('users'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$compile_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;

      UserRightNavController = $controller('UserRightNavController as vm', {
        $scope: $scope
      });
    }));

    describe('UserRightNavController', function () {
      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.authentication property that is an object', function () {
        expect($scope.vm.authentication).to.be.an('object');
      });

      it('should have a vm.navigation variable that is an object', function () {
        var element = $compile('<md-sidenav md-component-id="coreRightNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($scope);
        $scope.$digest();
        return expect($scope.vm.navigation).to.be.an('object');
      });

    });

  });

})();
