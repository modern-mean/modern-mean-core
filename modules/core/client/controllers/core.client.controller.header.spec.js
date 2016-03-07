(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    HeaderController;

  describe('core.client.controller.header.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$mdSidenav_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;

      HeaderController = $controller('HeaderController as vm', {
        $scope: $scope
      });
    }));

    describe('HeaderController', function () {
      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have vm.toggleLeft that is a function', function () {
        expect($scope.vm.toggleLeft).to.be.a('function');
      });

      it('should have vm.toggleRight that is a function', function () {
        expect($scope.vm.toggleRight).to.be.a('function');
      });

      describe('buildDelayedToggler', function () {
        beforeEach(inject(function(_$mdSidenav_) {
          $mdSidenav = _$mdSidenav_;
        }));

        it('should call', function () {
          var toggleSpy = chai.spy.on($mdSidenav, 'toggle');
          vm.buildDelayedToggler('left');
          expect(toggleSpy).to.have.been.called();
        });
      });
    });
  });
})();
