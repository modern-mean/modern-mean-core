(function() {
  'use strict';

  describe('HomeController', function () {
    //Initialize global variables
    var HomeController,
      $scope;

    // Load the main application module
    beforeEach(module(window.modernMeanApplication.name));

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();

      HomeController = $controller('HomeController as vm', {
        $scope: $scope
      });
    }));

    it('should expose the authentication service', function () {
      expect($scope.vm.authentication).toBeTruthy();
    });
  });
})();
