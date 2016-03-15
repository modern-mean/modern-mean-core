(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    SideNavLeftController;

  describe('core.client.controller.sidenav.left.js', function () {

    var closeSpy = chai.spy();

    beforeEach(module('core'));

    beforeEach(module(function ($provide) {
      $provide.factory('$mdSidenav', function() {
        return function() {
          return {
            close: closeSpy
          };
        };
      });
    }));

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

      describe('vm.close()', function () {
        it('call $mdSidenav.close()', function () {
          $scope.vm.close('coreLeftNav');
          expect(closeSpy).to.have.been.called();
        });
      });
    });
  });
})();
