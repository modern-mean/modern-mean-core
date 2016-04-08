(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    $compile,
    $controller,
    UsersHeaderController,
    $mdComponentRegistry,
    Authentication,
    $q;

  describe('users.client.controller.navigation.header.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, _$compile_, _$mdComponentRegistry_, _Authentication_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;
      $mdComponentRegistry = _$mdComponentRegistry_;
      Authentication = _Authentication_;
    }));

    describe('UsersHeaderController', function () {

      beforeEach(inject(function ($controller) {
        UsersHeaderController = $controller('UsersHeaderController as vm', {
          $scope: $scope
        });
      }));


      it('should have a vm variable', function () {
        return $scope.vm.should.be.an('object');
      });

      it('should have a vm.authentication object', function () {
        return $scope.vm.authentication.should.equal(Authentication);
      });

      it('should have a vm.isAdmin object', function () {
        return $scope.vm.isAdmin.should.equal(false);
      });

      it('should have a vm.navigation object', function () {
        return $scope.vm.navigation.should.be.an('object');
      });

      it('should set vm.navigation.left when ready', function () {
        $compile('<md-sidenav md-component-id="coreLeftNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($rootScope);
        $rootScope.$digest();

        var leftNav = $mdComponentRegistry.get('coreLeftNav');
        return $scope.vm.navigation.left.should.equal(leftNav);
      });

      it('should set vm.navigation.right when ready', function () {
        $compile('<md-sidenav md-component-id="coreRightNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($rootScope);
        $rootScope.$digest();

        var rightNav = $mdComponentRegistry.get('coreRightNav');
        return $scope.vm.navigation.right.should.equal(rightNav);
      });

    });

    describe('admin role', function () {
      var promise;

      beforeEach(inject(function ($controller, $q) {
        Authentication.authorization.roles = ['admin'];
        UsersHeaderController = $controller('UsersHeaderController as vm', {
          $scope: $scope
        });
      }));

      it('should set vm.isAdmin to true', function () {
        $rootScope.$digest();
        return $scope.vm.isAdmin.should.equal(true);
      });

    });

  });

})();
