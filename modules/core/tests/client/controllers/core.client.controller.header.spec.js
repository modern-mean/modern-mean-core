(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    HeaderController,
    $mdSidenav;

  describe('core.client.controller.header.js', function () {

    var toggleSpy = chai.spy();

    beforeEach(module('core'));

    beforeEach(module(function ($provide) {
      $provide.factory('$mdSidenav', function() {
        return function() {
          return {
            toggle: toggleSpy
          };
        };
      });
    }));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $mdSidenav = _$mdSidenav_;

      HeaderController = $controller('HeaderController as vm', {
        $scope: $scope
      });
    }));

    describe('HeaderController', function () {
      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have vm.toggleLeft that is a function', function () {
        expect($scope.vm.toggle).to.be.a('function');
      });

      describe('vm.toggle()', function () {

        it('should call $mdSidenav.toggle()', function () {
          $scope.vm.toggle('coreRightNav');
          expect(toggleSpy).to.have.been.called();
        });

      });
    });
  });
})();
