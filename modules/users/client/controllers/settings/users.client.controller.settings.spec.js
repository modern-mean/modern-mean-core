(function() {
  'use strict';

  describe('user.client.controller.settings.js', function () {

    var $scope,
      $rootScope,
      SettingsController;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      SettingsController = $controller('SettingsController as vm', {
        $scope: $scope
      });
    }));



    describe('SettingsController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

    });
  });
})();
