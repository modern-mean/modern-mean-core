(function() {
  'use strict';

  var $scope,
    $rootScope,
    HomeController;

  describe('core.client.controller.home.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      HomeController = $controller('HomeController as vm', {
        $scope: $scope
      });
    }));

    describe('HomeController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

    });
  });
})();
