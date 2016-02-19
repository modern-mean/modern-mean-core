(function() {
  'use strict';

  describe('user.client.controller.authentication.js', function () {

    var $scope,
      $rootScope,
      AuthenticationController;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      AuthenticationController = $controller('AuthenticationController as vm', {
        $scope: $scope
      });
    }));

    describe('AuthenticationController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

    });
  });
})();
