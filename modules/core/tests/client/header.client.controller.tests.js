(function() {
  'use strict';

  describe('HeaderController', function () {
    //Initialize global variables
    var HeaderController,
      Authentication,
      $state,
      $scope;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function (_Authentication_, $controller, _$state_,$rootScope) {
      $scope = $rootScope.$new();
      $state = _$state_;
      Authentication = _Authentication_;

      HeaderController = $controller('HeaderController as vm', {
        $scope: $scope
      });
    }));

    it('should expose the authentication service', function () {
      expect($scope.vm.authentication).toBe(Authentication);
    });

    it('should expose the $state service', function () {
      expect($scope.vm.$state).toBe($state);
    });

    it('should default menu to collapsed', function () {
      expect($scope.vm.isCollapsed).toBeFalsy();
    });

    describe('when toggleCollapsibleMenu', function () {
      var defaultCollapse;
      beforeEach(function () {
        defaultCollapse = $scope.vm.isCollapsed;
        $scope.vm.toggleCollapsibleMenu();
      });

      it('should toggle isCollapsed to non default value', function () {
        expect($scope.vm.isCollapsed).not.toBe(defaultCollapse);
      });

      it('should then toggle isCollapsed back to default value', function () {
        $scope.vm.toggleCollapsibleMenu();
        expect($scope.vm.isCollapsed).toBe(defaultCollapse);
      });
    });

    describe('when view state changes', function () {
      beforeEach(function () {
        $scope.vm.isCollapsed = true;
        $scope.$broadcast('$stateChangeSuccess');
      });

      it('should set isCollapsed to false', function () {
        expect($scope.vm.isCollapsed).toBeFalsy();
      });
    });
  });
})();
